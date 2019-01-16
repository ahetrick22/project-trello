import React, { Component } from 'react';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';

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
    if (this.props.card !== nextProps.card) {
      this.setState({ card: nextProps.card });
    }
  }

  archiveCard = card => {
    // TODO: Archive card
  };

  updateCard = card => {
    // TODO: Update card
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
          {editTitle ? (
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
            <h1 onDoubleClick={() => this.setState({ editTitle: true })}>
              {card.title}
            </h1>
          )}
          <select name="list" id="list">
            <option value={card.list}>{card.list}</option>
          </select>
          <select name="label" id="label">
            <option value={card.label}>{card.label}</option>
          </select>
          <h3>Description</h3>

          {editDesc ? (
            <textarea
              autoFocus
              name="description"
              cols="30"
              rows="5"
              value={card.description}
              onChange={this.updateCardDesc}
              onKeyPress={e =>
                e.key === 'Enter' ? this.setState({ editDesc: false }) : null
              }
            />
          ) : (
            <p onDoubleClick={() => this.setState({ editDesc: true })}>
              {card.description
                ? card.description
                : 'Add a description here...'}
            </p>
          )}

          <h3>Add Comment</h3>
          <textarea name="comment" id="comment" cols="30" rows="5" />
          <h3>Activity</h3>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            {card.comments.map((comment, index) => (
              <li key={index}>
                {comment.user} commented - {comment.text}
              </li>
            ))}
          </ul>
          <div className="buttons" style={{ margin: 'auto' }}>
            <ArchiveButton onClick={this.archiveCard(card)}>
              Archive
            </ArchiveButton>
            <UpdateButton onClick={this.updateCard(card)}>Update</UpdateButton>
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
  padding: 2em;
  margin-top: 2em;
  background: ${COLORS.secondary};
  font-family: ${TYPEFACE}
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
`;

const TextInput = styled.input`
  display: block;
  height: 50px;
  font-size: 25px;
  &:focus {
    border: 1px solid red;
  }
`;

const TextArea = styled.textarea``;

const UpdateButton = styled.button`
  cursor: pointer;
  font-size: 1em;
  height: 30px;
  width: 70px;
  background-color: ${COLORS.primary};
  color: ${COLORS.tertiary};
  border-radius: 5px;
`;

const ArchiveButton = styled.button`
  cursor: pointer;
  font-size: 1em;
  height: 30px;
  width: 70px;
  background-color: ${COLORS.archiveButton};
  color: ${COLORS.tertiary};
  border-radius: 5px;
`;
