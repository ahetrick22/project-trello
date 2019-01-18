import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import List from './list';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { StyledButton } from '../Components/styledButton';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
import {
  updateSameList,
  updatedList,
  updateDifferentList,
  newListOrderEvent
} from "../api";


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      listOrder: [],
      lists: {},
      hello: '',
    };
  }

  handleNewListClickEvent = () => {
    var newListAreaElement = document.getElementById('newListArea');
    if (newListAreaElement.style.visibility === 'hidden') {
      newListAreaElement.style.visibility = 'visible';
      document.getElementById('new-list-title').focus();
    } else {
      newListAreaElement.style.visibility = 'hidden';
    }
  };

  handleSubmitEvent = () => {
    var input = document.getElementById('new-list-title');
    if (input.value) {
      //send to server
      this.props.addList(this.props.match.params.boardID, input.value);
      //reset value of input to null, and css visibility to hidden
      input.value = '';
      document.getElementById('newListArea').style.visibility = 'hidden';
    }
  };

  componentDidMount() {
    const { boardID } = this.props.match.params;
    this.props.fetchBoard(boardID);
  }

  componentWillReceiveProps(nextProps) {
    updatedList(this);

    if (this.props.board !== nextProps.board) {
      var board = nextProps.board;

      //Build up this newData object for setState
      var newData = {
        listOrder: [],
        lists: {},
        cards: {}
      };

      var newListOrder = board.lists.map(list => list._id);
      var newListsArray = [];
      var newCardsArray = [];

      board.lists.forEach(list => {
        let listItem = {
          id: list._id,
          title: list.name,
          cardIds: []
        };
        list.cards.forEach(card => {
          listItem.cardIds.push(card._id);
          newCardsArray.push({ id: card._id, content: card.title });
        });
        newListsArray.push(listItem);
      });

      //normalize newListsArray
      var newLists = newListsArray.reduce((sum, list) => {
        return { ...sum, [list.id]: list };
      }, {});

      //normalize newCardsArray
      var newCards = newCardsArray.reduce((sum, card) => {
        return { ...sum, [card.id]: card };
      }, {});

      newData.listOrder = newListOrder;
      newData.lists = newLists;
      newData.cards = newCards;

      this.setState(newData);
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // User drops draggable into an area that is not a droppable
    if (!destination) {
      return;
    }

    // User drops draggable into the same exact position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move a list from one position to another
    if (type === 'column') {
      const newListOrder = Array.from(this.state.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newListPositionSocketObj = {
        listId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      };


      const newState = {
        ...this.state,
        listOrder: newListOrder
      };

      newListOrderEvent(newListPositionSocketObj, newState);
      this.setState(newState);
      return;
    }

    const startList = this.state.lists[source.droppableId];
    const finishList = this.state.lists[destination.droppableId];

    // Moving card within a list
    if (startList === finishList) {
      const newCardIds = Array.from(startList.cardIds);
      // remove the card from the card id list from where it was removed
      newCardIds.splice(source.index, 1);
      // insert the card into the card id list
      newCardIds.splice(destination.index, 0, draggableId);

      const sameListSocketObj = {
        listId: startList.id,
        cardId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      };

      const newList = {
        ...startList,
        cardIds: newCardIds
      };

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newList.id]: newList
        }
      };

      updateSameList(sameListSocketObj, newState);

      //need setState
      this.setState(newState);
      return;
    }

    // Moving a card from one list to another
    const startCardIds = Array.from(startList.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startList,
      cardIds: startCardIds
    };

    const finishCardIds = Array.from(finishList.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishList,
      cardIds: finishCardIds
    };
    const differentListSocketObj = {
      startListId: startList.id,
      finishListId: finishList.id,
      cardId: draggableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    };

    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    updateDifferentList(differentListSocketObj, newState);
    //need setState
    this.setState(newState);
  };

  //change board name
// ChangeBoardName() {
//   <BoardNameInputField>
//     <input 
//       value={this.props.board.name}
//       autoFocus={true}
//       onChange={(e) => this.setState({boardInput: e.target.value})} 
//     />
//   </BoardNameInputField>
// }

  render() {
    return (
      <Fragment>
        <InfoBar>
          <h3>{this.props.board.name} | Project Shift</h3>
          <StyledButton onClick={this.handleNewListClickEvent}>
            Add List
          </StyledButton>
        </InfoBar>

        <BoardArea className="board-area">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {!this.state.listOrder ? (
              <p>'...Loading'</p>
            ) : (
              <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="column"
              >
                {provided => (
                  <Container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.listOrder.map((listId, index) => {
                      const list = this.state.lists[listId];
                      const cards = list.cardIds.map(
                        taskId => this.state.cards[taskId]
                      );

                      return (
                        <List
                          key={list.id}
                          column={list}
                          cards={cards}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            )}
          </DragDropContext>
          <NewListArea id="newListArea" style={{ visibility: 'hidden' }}>
            <h3>New list name</h3>
            <br />
            <input
              id="new-list-title"
              type="text"
              name="listName"
              onKeyPress={e =>
                e.key === 'Enter' ? this.handleSubmitEvent() : null
              }
            />
          </NewListArea>
        </BoardArea>
      </Fragment>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

const NewListArea = styled('div')`
  margin: 8px;
  padding: 8px;
  background-color: ${COLORS.secondary};
  border-radius: 8px;
  width: 220px;
  box-shadow: 1px 1px 8px #999;
`;

const InfoBar = styled('div')`
  background: ${COLORS.secondary}
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 25px
`;

const BoardArea = styled('div')`
  background: ${COLORS.primary}
  // min-height: 83vh;
  padding: 1em;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

function mapStateToProps({ selectedBoard, boards }) {
  return {
    board: selectedBoard
    // organization: boards[0].organization
  };
}

export default connect(
  mapStateToProps,
  actions
)(Board);
