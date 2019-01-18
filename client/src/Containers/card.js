import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { COLORS } from '../css/StyleGuide';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 20px 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  box-shadow: 2px 1px 4px #999;
`;

const LabelBlob = styled.div`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  background: ${props => props.label || COLORS.primary};
`;

export default class Card extends React.Component {
  render() {
    console.log('this props', this.props);
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
              onClick={() => this.props.showModal()}
            >
              {this.props.card.content}
              <LabelBlob label={this.props.card.label} />
            </Container>
          </Link>
        )}
      </Draggable>
    );
  }
}
