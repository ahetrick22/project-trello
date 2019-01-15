import React, { Component } from 'react';
import BoardList from '../Components/boardList';
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
      <div className="org-home" style={{ textAlign: 'center' }}>
        <div
          className="org-info"
          style={{
            height: '30vh',
            lineHeight: '30vh',
            borderBottom: '1px solid black'
          }}
        >
          <h1>{organization.name}</h1>
        </div>
        <div className="boards" style={{ height: '60vh' }}>
          <h2 style={{ textDecoration: 'underline' }}>Boards</h2>
          <BoardList boards={boards} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ organization, boards }) {
  return { organization, boards };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
