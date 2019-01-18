import React, { Component, Fragment } from 'react';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
import { FaArchive } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
      editTitle: false,
      editDesc: false,
      actualSelectedCard: {}
    };
  }

  componentDidMount = () => {
    const { cardID } = this.props.props.match.params;

    if (cardID || this.props.match.path !== '/boards/:boardID') {
      this.props.fetchCard(cardID);
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ card: nextProps.selectedCard.selected });
  };

  archiveCard = card => {
    //needs to hit an update card action instead
  };

  // *********** UPDATE CARD TITLE ************ //
  updateLocalCardStateTitle = e => {
    const card = { ...this.state.card };
    card.title = e.target.value;
    this.setState({ card });
  };

  updateCardTitle = () => {
    const { card } = this.state;
    this.props.updateCard(card._id, { title: card.title });
  };

  // *********** UPDATE CARD DESC ************ //
  updateLocalCardStateDesc = e => {
    let card = { ...this.state.card };
    card.description = e.target.value;
    this.setState({ card });
  };

  updateCardDesc = () => {
    const { card } = this.state;
    this.props.updateCard(card._id, { description: card.description });
  };

  updateLocalCardStateLabel = e => {
    let card = { ...this.state.card };
    card.label = e.target.value;
    this.setState({ card });
  };

  updateServerCard = (e, prop, val) => {
    const { card } = this.state;
    //needs to hit an update card action instead
    this.props.updateCard(card._id, {
      [prop]: val ? val : card[prop]
    });
  };

  updateCardLabel = e => {
    this.props.updateCard(this.props.selectedCard.selected._id, {
      label: e.target.value
    });
    //needs to hit an update card action instead
    // let label = { ...this.state.card.label };
    // label.value = e.target.value;
    // this.setState({ label });
  };

  createListItems = () => {
    let items = [];
    //get card.list.val, find matching list.name

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
      //create options dynamically based on which props are passed to parent
    }
    return;
  };

  onDropDownList = e => {
    //needs to hit an update list route instead
    let list = { ...this.state.card.list };
    list.name = e.target.value;
    this.setState({ list });
  };

  render() {
    const { editTitle, editDesc, card } = this.state;
    const showHideClassName = this.props.show
      ? 'modal display-block'
      : 'modal display-none';
    if (Object.keys(card).length === 0) {
      return <div>Loading...</div>;
    } else {
      const { selectedCard } = this.props;

      return (
        <div className="modal">
          <CardModal className={showHideClassName}>
            <Link to={`/boards/${this.props.selectedCard._id}`}>
              <CloseButton onClick={() => this.props.handleClose()}>
                X
              </CloseButton>
            </Link>
            <div className="card-header" style={{ padding: '1em' }}>
              <img src={require('../assets/card.svg')} alt="trello card icon" />
              {/* If user is editing title */}
              {editTitle ? (
                // Render input with card title
                <TextInput
                  autoFocus
                  type="text"
                  value={card.title}
                  onChange={this.updateLocalCardStateTitle}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      this.updateCardTitle();
                      this.setState({ editTitle: false });
                    }
                  }}
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
              <div className="cardList">
                <span>List:</span>
                <input
                  type="select"
                  onChange={this.onDropDownList}
                  label="Multiple Select"
                  multiple
                >
                  {this.createListItems()}
                </input>
                {/* <select name="list" id="list" value={this.state.card.list.name.value}  onChange= {this.onDropDownList}>
                <option value={card.list}>{card.list}</option>
                {/* <option value={this.board.list.name}>{card.list.name}</option> */}
                {/* </select> */}
              </div>
              <br />

              <div className="card-label">
                <span>Label:</span>
                <select
                  className="label"
                  id="label"
                  onChange={e => this.updateServerCard('label', e.target.val)}
                  defaultValue={card.label}
                >
                  <option
                    value="red"
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Red
                  </option>
                  <option
                    value="orange"
                    style={{ backgroundColor: 'orange', color: 'white' }}
                  >
                    Orange
                  </option>
                  <option
                    value="yellow"
                    style={{ backgroundColor: 'yellow', color: 'black' }}
                  >
                    Yellow
                  </option>
                  <option
                    value="green"
                    style={{ backgroundColor: 'green', color: 'white' }}
                  >
                    Green
                  </option>
                  <option
                    value="blue"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                  >
                    Blue
                  </option>
                  <option
                    value="purple"
                    style={{ backgroundColor: 'purple', color: 'white' }}
                  >
                    Purple
                  </option>
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
                  <TextInput
                    autoFocus
                    type="text"
                    value={card.description}
                    onChange={this.updateLocalCardStateDesc}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        this.updateCardDesc();
                        this.setState({ editDesc: false });
                      }
                    }}
                  />
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
        </div>
      );
    }
  }
}

const mapStateToProps = ({ selectedCard }) => {
  return { selectedCard };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(CardDetail)
);

const CardModal = styled.div`
  position: relative;
  padding: 1em;
  background: ${COLORS.secondary};
  font-family: ${TYPEFACE};
  width: 50%;
  margin: 2em auto;
  border-radius: 5%;
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
  color: ${COLORS.archiveButton};
  font-size: 3em;
  font-weight: 600;
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
