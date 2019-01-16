import React, { Component } from 'react';
import BoardList from '../Components/boardList';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from "styled-components";



class Organization extends Component {
  componentDidMount() {
    this.props.fetchOrg();
    this.props.fetchBoards();
  }

  render() {
    const { organization, boards } = this.props;
    
    return <div>
        <OrgName>{organization.name}</OrgName>
        <div className="boards" style={{ height: "60vh" }}>
          <BoardName>Your Boards</BoardName>
          <BoardLayout>
          <BoardList boards={boards} />
        </BoardLayout>
        </div>
      </div>;
  }
}


const OrgName = styled("div")`
  font-family: "Roboto";
  display: flex;
  justify-content: center;
  font-size: 2em;
  background-color: #f2f2f2;
  padding: 20px 0 20px 0;
  margin-top: 1%;
  
`;

const BoardLayout = styled('div')`
display:flex;
flex-direction:row;
justify-content:flex-start;
margin:10px;
align-items:center;

`

const BoardName = styled("h2")`
  font-family: "Roboto";
  display: flex;
  flex-wrap:wrap;
  font-size:50px;
  justify-content: center;
  margin-top:20px;
`;


function mapStateToProps({ organization, boards }) {
  return { organization, boards };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
