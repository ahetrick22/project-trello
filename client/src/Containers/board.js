import React, { Component } from 'react';
import styled from 'styled-components';
import List from './list';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import _ from 'underscore';

const Container = styled.div`
   display: flex;
`;

class Board extends Component {

   constructor(props) {
      super(props);
      this.state = {
         listOrder: ["column-1", 'column-2'],
         lists: {
            "column-1": {
               id: "column-1",
               title: "To Do",
               cardIds: ["task-1", "task-2", "task-3", "task-4"]
            }, 
            "column-2": {
               id: "column-2",
               title: "In Progress",
               cardIds: []
            },
         },
         cards: {
            "task-1": { id: "task-1", content: "Take out the garbage"},
            "task-2": { id: "task-2", content: "Watch my favorite show"},
            "task-3": { id: "task-3", content: "Charge my phone"},
            "task-4": { id: "task-4", content: "Cook dinner"}
         }
      };
   }

   componentDidMount() {
     const { boardID } = this.props.match.params;
    this.props.fetchBoard(boardID);
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
    console.log(this.props.board);
      return (
         <DragDropContext
            onDragEnd = {this.onDragEnd}
         >
            <Droppable 
               droppableId='all-lists' 
               direction='horizontal' 
               type='column'
            >
               { (provided) => (
                  <Container
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                  >
                     {this.state.listOrder.map((listId, index) => {
                        const list = this.state.lists[listId];
                        const cards = list.cardIds.map(taskId => this.state.cards[taskId]);

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
         </DragDropContext>
      );
   }   
}

function mapStateToProps({ boards, lists, board }) {
   return {
     boards,
     lists,
     board
   };
 }
 
 export default connect(
   mapStateToProps,
   actions
 )(Board);
