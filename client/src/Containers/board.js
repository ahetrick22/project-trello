import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import List from './list';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import _ from 'underscore';
import {StyledButton} from '../Components/styledButton';

const Container = styled.div`
   display: flex;
`;

class Board extends Component {

   constructor(props) {
      super(props);
      this.state = {};

      this.handleNewListClickEvent = this.handleNewListClickEvent.bind(this);
   }
   handleNewListClickEvent() {
      console.log('New List Clicked');
   }

   componentDidMount() {
      const { boardID } = this.props.match.params;
      this.props.fetchBoard(boardID);
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.board !== nextProps.board) {
         var board = nextProps.board;

         //Build up this newData object for setState
         var newData = {
            listOrder: [], 
            lists: {},
            cards: {}
         };

         var newListOrder =  board.lists.map(list => list._id);
         var newListsArray = [];
         var newCardsArray = [];

         board.lists.forEach(list =>{
         let listItem = { 
            "id": list._id, 
            "title": list.name,
            "cardIds": []
         }
         list.cards.forEach(card => {
            listItem.cardIds.push(card._id);
            newCardsArray.push({"id": card._id, "content": card.title});
         })
         newListsArray.push(listItem);
         });

         //normalize newListsArray
         var newLists = newListsArray.reduce((sum, list) => {
            return {...sum, [list.id]: list}
            }, {});
            
         //normalize newCardsArray
         var newCards = newCardsArray.reduce((sum, card) => {
         return {...sum, [card.id]: card}
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

      if (type === 'column') {
         const newListOrder = Array.from(this.state.listOrder);
         newListOrder.splice(source.index, 1);
         newListOrder.splice(destination.index, 0, draggableId);

         const newState = {
            ...this.state,
            listOrder: newListOrder,
         };

         this.setState(newState);
         return;
      }

      const startList = this.state.lists[source.droppableId];
      const finishList = this.state.lists[destination.droppableId];

      // Moving positions within the list
      if (startList === finishList) {
         const newCardIds = Array.from(startList.cardIds);
         // remove the card from the card id list from where it was removed
         newCardIds.splice(source.index, 1);
         // insert the card into the card id list
         newCardIds.splice(destination.index, 0, draggableId);
   
         const newList = {
            ...startList,
            cardIds: newCardIds,
         };
   
         const newState = {
            ...this.state,
            lists: {
               ...this.state.lists,
               [newList.id]: newList,
            }
         };
   
         this.setState(newState);
         return;
      }

      // Moving from one list to another
      const startCardIds = Array.from(startList.cardIds);
      startCardIds.splice(source.index, 1);
      const newStart = {
         ...startList,
         cardIds: startCardIds,
      };

      const finishCardIds = Array.from(finishList.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinish = {
         ...finishList,
         cardIds: finishCardIds,
      };

      const newState = {
         ...this.state,
         lists: {
            ...this.state.lists,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
         },
      };

      this.setState(newState);

      // call server endpoint to let know that a reorder has occurred

   }


   render() {
    //  const { board } = this.props.boards;
    console.log(this.props);
      return <Fragment>
          <InfoBar>        
                <h1>{this.props.board.name}</h1>
                <h2>{this.props.organization.name}</h2>
            <StyledButton onClick={this.handleNewListClickEvent}>+New List</StyledButton>
          </InfoBar>
          <BoardArea>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {!this.state.listOrder ? <p>
                  '...Loading'
                </p> : <Droppable droppableId="all-lists" direction="horizontal" type="column">
                  {provided => <Container {...provided.droppableProps} ref={provided.innerRef}>
                      {this.state.listOrder.map((listId, index) => {
                        const list = this.state.lists[listId];
                        const cards = list.cardIds.map(taskId => this.state.cards[taskId]);

                        return <List key={list.id} column={list} cards={cards} index={index} />;
                      })}
                      {provided.placeholder}
                    </Container>}
                </Droppable>}
            </DragDropContext>
            <NewListArea>
               <form action="Submit">
                  List Name: <input type="text" name="listName"/>
               </form>
            </NewListArea>
          </BoardArea>
        </Fragment>;   }   
}

const NewListArea = styled('div')``;

const InfoBar = styled('div')`
height:75px;
border:1px solid black;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;

`

const BoardArea = styled('div')`
display:flex;
flex-direction:row;
`

function mapStateToProps({ board, organization }) {
   return {
     board,
     organization
   };
 }
 
 export default connect(
   mapStateToProps,
   actions
 )(Board);
