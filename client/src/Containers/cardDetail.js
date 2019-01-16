import React, { Component } from 'react';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

class CardDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardTitle: '',
      cardDesc: '',
      newComments: [],
      editTitle: false,
      editDesc: false
    };
  }

  componentDidMount = async () => {
    const { cardID } = this.props.match.params;
    await this.props.fetchCard(cardID);
  };

  archiveCard = card => {
    // TODO: Archive card
  };

  updateCard = card => {
    // TODO: Update card
  };

  render() {
    const { card } = this.props;
    const { editTitle, editDesc } = this.state;

    if (Object.keys(card).length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <CardModal className="modal">
          {editTitle ? (
            <input
              type="text"
              value={this.state.cardTitle}
              onChange={e => this.setState({ cardTitle: e.target.value })}
              onKeyPress={e =>
                e.key === 'Enter' ? this.setState({ editTitle: false }) : null
              }
              style={{ display: 'block' }}
            />
          ) : (
            <h1
              onDoubleClick={() =>
                this.setState({ cardTitle: card.title, editTitle: true })
              }
            >
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
          <p>{card.description}</p>
          <h3>Add Comment</h3>
          <textarea onk name="comment" id="comment" cols="30" rows="5" />
          <h3>Activity</h3>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            {card.comments.map((comment, index) => (
              <li key={index}>
                {comment.user} commented - {comment.text}
              </li>
            ))}
          </ul>
          <button onClick={this.archiveCard(card)}>Archive</button>
          <button onClick={this.updateCard(card)}>Save</button>
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
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
`;
