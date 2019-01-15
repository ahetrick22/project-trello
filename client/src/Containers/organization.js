import React, { Component } from 'react';
import * as actions from '../Actions';
import { connect } from 'react-redux';

class Organization extends Component {
  componentDidMount() {
    this.props.fetchOrg();
    this.props.fetchBoards();
  }
  render() {
    const { organization, boards } = this.props;
    return (
      <div>
        <h1>{organization.name}</h1>
        <h3>Boards</h3>
        <ul>
          {boards.map((b, index) => (
            <li key={index}>{b.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ organization, boards }) {
  return {
    organization,
    boards
  };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
