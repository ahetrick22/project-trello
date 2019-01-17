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
      card: {},
      editTitle: false,
      editDesc: false
    };
  }

  componentDidMount = async () => {
    const { cardID } = this.props.match.params;
    await this.props.fetchCard(cardID);
  };

  componentWillReceiveProps(nextProps) {
    // Set local card state to card from redux store
    if (this.props.card !== nextProps.card) {
      this.setState({ card: nextProps.card });
    }
  }

  closeModal = () => {
    // TODO: Close card modal
  };

  archiveCard = card => {
    // TODO: Archive card
  };

  updateCardTitle = e => {
    let card = { ...this.state.card };
    card.title = e.target.value;
    this.setState({ card });
  };

  updateCardDesc = e => {
    let card = { ...this.state.card };
    card.description = e.target.value;
    this.setState({ card });
  };

  render() {
    const { card, editTitle, editDesc } = this.state;

    if (Object.keys(card).length === 0) {
      return <div>Loading...</div>;
    } else {
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
            <span>List:</span>
            <select name="list" id="list" defaultValue={card.list}>
              <option value={card.list}>{card.list}</option>
            </select>
            <br></br>
            <span>Label:</span>
            <select name="label" id="label" defaultValue={card.label}>
              <option value={card.label}>{card.label}</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
            </select>
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
                  {comment.user} commented - {comment.text}
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
  return { card: selectedCard };
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
