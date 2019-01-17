import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 20px 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  box-shadow: 2px 1px 4px #999;
`;

export default class Card extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Link
            to={`/cards/${this.props.card.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {this.props.card.content}
            </Container>
          </Link>
        )}
      </Draggable>
    );
  }
}
