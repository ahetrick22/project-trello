import React, { Component } from 'react';
import BoardList from '../Components/boardList';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';

class Organization extends Component {
  componentDidMount() {
    this.props.fetchOrg();
    this.props.fetchBoards();
  }

  render() {
    const { organization, boards } = this.props;

    if (Object.keys(organization).length === 0 && boards.length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="org-home" style={{ fontFamily: TYPEFACE }}>
          <OrgInfo>
            <h1>{organization.name}</h1>
          </OrgInfo>
          <OrgBoards>
            <h1>Boards</h1>
            <BoardList boards={boards} />
            <AddBoardButton>Add Board</AddBoardButton>
          </OrgBoards>
        </div>
      );
    }
  }
}

const OrgInfo = styled('div')`
  text-align: center;
  font-size: 1.75em
  height: 30vh;
  line-height: 30vh;
  background-color: ${COLORS.secondary};
`;

const OrgBoards = styled('div')`
  text-align: center;
  height: 60vh;
  padding: 2em 0;
`;

const AddBoardButton = styled.button`
  font-size: 1em;
  margin-top: 3em;
  height: 50px;
  width: 100px;
  background-color: ${COLORS.addButtons};
  color: ${COLORS.tertiary};
  border-radius: 10px;
`;

function mapStateToProps({ organization, boards }) {
  return { organization, boards };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
