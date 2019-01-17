import React, {Fragment} from 'react';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
import Card from './card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { TiTimes } from 'react-icons/ti';

class List extends React.Component {
   constructor(props){
      super(props)
      this.state= {
         listInputHidden:true,
         listInput:''
      }

      this.renderListInputField = this.renderListInputField.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
   }

   renderListInputField() {
      if(this.state.listInputHidden){
         return (
         <Button onClick={() => this.setState({ listInputHidden: !this.state.listInputHidden })}>Add Card</Button>)
      } else {
         return (
         <CardInputField>
            <input id='inputCard' value={this.state.listInput} autoFocus={true} onKeyPress={(e) => this.handleKeyPress(e)} onChange={(e) => this.setState({listInput:e.target.value})} />
            <TiTimes style={{color:'red', opacity:'0.7'}} onClick={() => {
               this.setState({ listInputHidden: !this.state.listInputHidden });
               }}/>
         </CardInputField>
         )
      }
   }

   handleKeyPress(event) {
      if(event.key==='Enter' && this.state.listInput){
         console.log('this props: ', this.props);
         
         this.setState({listInput:''})
         
         //addCard() needs to update the server, and returned value from the server needs to update the storeState 
         this.props.addCard(this.props.column.id, this.state.listInput)
      }
   }

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
                {this.renderListInputField()}
              </Container>}
          </Draggable>
        </Fragment>;
   }
}

const Button = styled.button`
   background-color:${COLORS.addButtons};
	border-radius:28px;
	border:1px solid ${COLORS.addButtons};
   display:flex;
   justify-content: center;
   margin: 0 auto;
   margin-bottom: 5px;
	cursor:pointer;
	color:#ffffff;
	font-family:${TYPEFACE};
	font-size:14px;
	padding:5px 20px;
	text-decoration:none;
   text-shadow:0px 1px 0px #2f6627;
   opacity: 0.8;
   :hover{
      background-color: ${COLORS.primary};
      border:1px solid ${COLORS.primary};
   }
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 8px;
  width: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 8px #999;
`;

const Title = styled.h3`
  padding: 8px;
`;

const CardList = styled.div`
   padding: 8px;
   transition: background-color 0.5s ease;

   background-color: ${props => props.isDraggingOver ? 'lightgrey' : 'inherit'}

   flex-grow: 1;
   min-height: 100px;
`;

const CardInputField = styled('div')`
display:flex;
flex-direction:row;
align-items:center;
width:100%
margin: 0px 10px 5px 10px;
`

function mapStateToProps({ boards }) {
  return {
    boards
  };
}

export default connect(
  mapStateToProps,
  actions
)(List);

//const PRIMARY_COLOR = '#';
