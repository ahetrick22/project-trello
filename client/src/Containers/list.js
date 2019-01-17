import React, {Fragment} from 'react';
import styled from 'styled-components';
import Card from './card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';

const Container = styled.div`
   margin: 8px;
   border: 1px solid lightgrey;
   background-color: white;
   border-radius: 2px;
   width: 220px;

   display: flex;
   flex-direction: column;
`;
const Title = styled.h3`
   padding: 8px;
`;
const CardList = styled.div`
   padding: 8px;
   transition: background-color 0.5s ease;
   background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')}
   flex-grow: 1;
   min-height: 100px;
`;

class List extends React.Component {
   render() {
      return <Fragment>
          <Draggable draggableId={this.props.column.id} index={this.props.index}>
            {provided => <Container {...provided.draggableProps} ref={provided.innerRef}>
                <Title {...provided.dragHandleProps}>
                  {this.props.column.title}
                </Title>
                <Droppable droppableId={this.props.column.id} type="card">
                  {(provided, snapshot) => <CardList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                      {this.props.cards.map((card, index) => (
                        <Card key={card.id} card={card} index={index} />
                      ))}
                      {provided.placeholder}
                    </CardList>}
                </Droppable>
               <button onClick={() => this.props.addCard(this.props.column.id, "yo")}>Test</button>
              </Container>}
            
          </Draggable>
         
        </Fragment>;
   }
}

function mapStateToProps({ boards }) {
   return {
     boards
   };
 }
 
 export default connect(
   mapStateToProps,
   actions
 )(List);

 const PRIMARY_COLOR = '#'