import React, { Fragment } from 'react';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
import Card from './card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { TiTimes } from 'react-icons/ti';
import CardDetail from './cardDetail';
import { withRouter } from 'react-router-dom';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      editTitle: false,
      listInputHidden: true,
      listInput: '',
      modalOpen: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.displayModal = this.displayModal.bind(this)
  }
  showModal = () => {
    console.log(this.state);
    this.setState({ modalOpen: true });
  };
  hideModal = () => {
    this.setState({ modalOpen: false });
  };

  displayModal = () => {
    if (this.state.modalOpen) {
      return (
        <WholeModalView>
          <CardDetail
            show={this.state.modalOpen}
            handleClose={this.hideModal}
            props={this.props}
          />
        </WholeModalView>
      );
    }
  };

  componentDidMount() {
    // Set local card state to card from redux store
    this.setState({ listTitle: this.props.column.title });
  }

  // componentDidUpdate(prevProps) {
  //   if()
  // }

  renderListInputField = () => {
    if (this.state.listInputHidden) {
      return (
        <Fragment>
          <hr style={{ width: '90%', margin: '10px auto 5px' }} />
          <Button
            onClick={() =>
              this.setState({ listInputHidden: !this.state.listInputHidden })
            }
          >
            Add Card
          </Button>
        </Fragment>
      );
    } else {
      return (
        <CardContainer> 
          <CardInputField>
            <input
              id="inputCard"
              value={this.state.listInput}
              autoFocus={true}
              onKeyPress={e => this.handleKeyPress(e)}
              onChange={e =>
                this.setState({
                  listInput: e.target.value
                })
              }
            />
            <TiTimes
              style={{ color: 'red', opacity: '0.7' }}
              onClick={() => {
                this.setState({ listInputHidden: !this.state.listInputHidden });
              }}
            />
          </CardInputField>
        </CardContainer>
      );
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter' && this.state.listInput) {
      this.setState({ listInput: '', listInputHidden: true });

      //addCard() needs to update the server, and returned value from the server needs to update the storeState
      this.props.addCard(this.props.column.id, this.state.listInput);
    }
  };

  updateListTitle = e => {
    if (e.key === 'Enter') {
      // update list
      this.props.updateList(this.props.column.id, this.state.listTitle);
      this.setState({ editTitle: false });
    } else {
      return;
    }
  };

  render() {
    const { editTitle, listTitle } = this.state;
    const cardLength = this.props.cards.length;
    return (
      <Fragment>
        {this.displayModal()}
        <Draggable draggableId={this.props.column.id} index={this.props.index}>
          {provided => (
            <Container {...provided.draggableProps} ref={provided.innerRef}>
              <ListHeader>
                {editTitle ? (
                  // Render input with list title
                  <TextInput
                    autoFocus
                    type="text"
                    value={listTitle}
                    onChange={e => this.setState({ listTitle: e.target.value })}
                    onKeyPress={e => this.updateListTitle(e)}
                  />
                ) : (
                  // Else render header w/ title
                  <h3
                    {...provided.dragHandleProps}
                    onDoubleClick={() => this.setState({ editTitle: true })}
                  >
                    {this.state.listTitle}
                  </h3>
                )}
                {cardLength === 1 ? (
                  <CardInfo>1 Card</CardInfo>
                ) : (
                  <CardInfo>{cardLength} Cards</CardInfo>
                )}
              </ListHeader>
              <hr style={{ width: '90%', margin: '5px auto' }} /> 
              <Droppable droppableId={this.props.column.id} type="card">
                {(provided, snapshot) => (
                  <CardList
                    className="card-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {this.props.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        showModal={this.showModal}
                      />
                    ))}
                    {/* label={this.props.selectedBoard.lists.cards[index].label} */}
                    {provided.placeholder}
                  </CardList>
                )} 
              </Droppable>
              {this.renderListInputField()}
            </Container>
          )}
        </Draggable>
      </Fragment>
    );
  }}
// }

const CardInfo = styled.p`
  font-family: ${TYPEFACE};
  font-size: 12px;
  opacity: 0.7;
`;

const Button = styled.button`
  background-color: ${COLORS.addButtons};
  border-radius: 28px;
  border: 1px solid ${COLORS.addButtons};
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${COLORS.tertiary};
  font-family: ${TYPEFACE};
  font-size: 14px;
  padding: 5px 20px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  opacity: 0.8;
  :hover {
    background-color: ${COLORS.primary};
    border: 1px solid ${COLORS.primary};
  }
`;
const CardContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 20px 8px;
  margin-bottom: 8px;
  background-color: ${COLORS.secondary};
  box-shadow: 2px 1px 4px #999;
`;
const Container = styled.div`
  height: 76vh;
  margin: 8px;
  background-color: ${COLORS.secondary};
  border-radius: 8px;
  width: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 8px #999;
`;

const ListHeader = styled.div`
  padding: 8px;
`;

const TextInput = styled.input`
  height: 30px;
  font-size: 20px;
`;

const CardList = styled.div`
  padding: 0 8px 8px 8px;
  transition: background-color 0.5s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  overflow: auto;
  height: 100%;
`;

const CardInputField = styled('div')`
display:flex;
flex-direction:row;
align-items:center;
width:100%;
height: 100%;
margin: 10px;
`;

const WholeModalView = styled('div')`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  ::first-child {
    border: 10px solid black;
  }
`;

function mapStateToProps({ boards }) {
  return {
    boards
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(List)
);

//const PRIMARY_COLOR = '#';
