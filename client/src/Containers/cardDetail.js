import React, { Component, Fragment } from 'react';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
import { FaArchive } from 'react-icons/fa';

class CardDetail extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      editTitle: false,
      editDesc: false,
      actualSelectedCard: {}
    };
    
  }

  componentDidMount = () => {
    const { cardID } = this.props.match.params;
    this.props.fetchCard(cardID);
    }
   

  closeModal = () => {
    // TODO: Close card modal - either use portals or redirect back to this.selectedCard._id (that is the board id)
    //probably needs to dispatch an action to clear out the selected card
  };

  archiveCard = card => {
    //needs to hit an update card action instead
  };

  updateCardTitle = e => {
    //needs to hit an update card action instead
    let card = { ...this.state.card };
    card.title = e.target.value;
    this.setState({ card });
  };

  updateCardDesc = e => {
    //needs to hit an update card action instead
    let card = { ...this.state.card };
    card.description = e.target.value;
    this.setState({ card });
  };

  updateCardLabel = e => {
    //needs to hit an update card action instead
    let label = { ...this.state.card.label };
    label.value = e.target.value;
    this.setState({ label });
  };

  createListItems = () => {
    let items = [];
    //get card.list.val, find matching list.name

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(<option key={i} value={i}>{i}</option>);
      //create options dynamically based on which props are passed to parent
    }
    return;
  }


  onDropDownList = e => {
    //needs to hit an update list route instead
    console.log("the list item is: ", e.target.value);
    let list = {...this.state.card.list};
    list.name = e.target.value;
    this.setState({list});
  }

  render() {
    if (Object.keys(this.props.selectedCard).length === 0) {
      return <div>Loading...</div>;
    } 
    else {
      const { editTitle, editDesc, selectedCard } = this.props;
      console.log(selectedCard);
      const card = selectedCard.selected;
      return (
        <CardModal className="modal">
          <CloseButton onClick={this.closeModal}>X</CloseButton>
          <div className="card-header" style={{ padding: '1em' }}>
            <img src={require('../assets/card.svg')} alt="trello card icon" />
            {/* If user is editing title */}
            {editTitle ? (
              // Render input with card title
              <TextInput
                autoFocus
                type="text"
                value={card.title}
                onChange={this.updateCardTitle}
                onKeyPress={e =>
                  e.key === 'Enter' ? this.setState({ editTitle: false }) : null
                }
              />
            ) : (
                // Else render header w/ title
                <h1
                  style={{ display: 'inline' }}
                  onDoubleClick={() => this.setState({ editTitle: true })}
                >
                  {/* Truncate title if longer than 50 chars */}
                  {card.title.length > 50
                    ? `${card.title.slice(0, 50)}...`
                    : card.title}
                </h1>
              )}
            <br />
            <div className='cardList'>
              <span>List:</span>
              <input type="select" onChange={this.onDropDownList} label='Multiple Select' multiple>{this.createListItems()}
              </input>
              {/* <select name="list" id="list" value={this.state.card.list.name.value}  onChange= {this.onDropDownList}>
                <option value={card.list}>{card.list}</option>
                {/* <option value={this.board.list.name}>{card.list.name}</option> */}
              {/* </select> */}
            </div>
            <br></br>

              <div className="card-label">
                <span>Label:</span>
                <select className="label" id="label"  onChange={this.updateCardLabel}>  
                  <option value="red" style={{backgroundColor:'red', color: 'white'}}>Red</option>
                  <option value="orange" style={{ backgroundColor: 'orange', color: 'white' }}>Orange</option>
                  <option value="yellow" style={{ backgroundColor: 'yellow', color: 'black' }}>Yellow</option>
                  <option value="green" style={{ backgroundColor: 'green', color: 'white' }}>Green</option>
                  <option value="blue" style={{ backgroundColor: 'blue', color: 'white' }}>Blue</option>
                  <option value="purple" style={{ backgroundColor: 'purple', color: 'white' }}>Purple</option>
                  </select>
              </div>
          </div>
          <div className="card-description" style={{ padding: '1em' }}>
            <img
              src={require('../assets/description.svg')}
              alt="trello description icon"
            />
            <h3 style={{ display: 'inline' }}>Description</h3>
            <br />
            {/* If user is editing desc */}
            {editDesc ? (
              <Fragment>
                {/* Render textarea w/ desc */}
                <textarea
                  autoFocus
                  name="description"
                  cols="30"
                  rows="5"
                  value={card.description}
                  onChange={this.updateCardDesc}
                />
                <br />
                <button onClick={() => this.setState({ editDesc: false })}>
                  Save
                </button>
              </Fragment>
            ) : (
                // Else, render p w/ desc
                <p onDoubleClick={() => this.setState({ editDesc: true })}>
                  {/* If there's a card description */}
                  {card.description
                    ? // If the length is over 200 chars
                    card.description.length > 200
                      ? // Truncate desc
                      `${card.description.slice(0, 200)}...`
                      : // Else, show desc
                      card.description
                    : // If there's no card desc
                    'Add a description here...'}
                </p>
              )}
          </div>
          <div className="add-card-comment" style={{ padding: '1em' }}>
            <img
              src={require('../assets/comment.svg')}
              alt="trello description icon"
            />
            <h3 style={{ display: 'inline' }}>Add Comment</h3>
            <br />
            <textarea name="comment" id="comment" cols="30" rows="5" />
          </div>
          <div className="card-activity" style={{ padding: '1em' }}>
            <img
              src={require('../assets/activity.svg')}
              alt="trello description icon"
            />
            <h3 style={{ display: 'inline' }}>Activity</h3>
            <br />
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
              {card.comments.map((comment, index) => (
                <li key={index}>
                  {comment.user.email} commented - {comment.text}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="card-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ArchiveButton onClick={this.archiveCard(card)}>
              <FaArchive />
              Archive
            </ArchiveButton>
          </div>
        </CardModal>
      );
    }
  }
}


const mapStateToProps = ({ selectedCard }) => {
  return { selectedCard };
};

export default connect(
  mapStateToProps,
  actions
)(CardDetail);

const CardModal = styled.div`
  position: relative;
  padding: 1em;
  background: ${COLORS.secondary};
  font-family: ${TYPEFACE}
  width: 50%;
  margin: 2em auto ;
  border-radius: 5%
`;

const TextInput = styled.input`
  height: 50px;
  font-size: 25px;
`;

const ArchiveButton = styled.button`
  cursor: pointer;
  font-size: 1em;
  height: 40px;
  width: 100px;
  background-color: ${COLORS.archiveButton};
  color: ${COLORS.tertiary};
  border-radius: 5px;
`;

const CloseButton = styled.button`
  color: ${COLORS.archiveButton}
  font-size: 3em;
  font-weight: 600
  position: absolute;
  top: 10px;
  right: 20px;
  border: none;
  background: transparent;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
