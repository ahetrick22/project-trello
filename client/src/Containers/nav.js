import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
//import FlexContainer from 'react-styled-flexbox';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../Actions';
import { withRouter } from 'react-router';

const NavDiv = styled.div`
  color: ${COLORS.tertiary};
  font-family: ${TYPEFACE};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${COLORS.primary};
  align-items: center;
  font-size: 1.3em;
  height: 60px;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const LeftButtons = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  font-size: 1.5em;
`;

const RightButtons = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  color: ${COLORS.tertiary};
`;

const Linker = styled.div`
  a {
    padding: 0 10px;
    color:white;
    text-decoration: none;  
  }
  a:hover {
    color: ${COLORS.secondary};
  }
`;

//Still needs some work but is a functioning navBar

export class NavBar extends Component {
  handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    
    this.props.signout();
    window.location.reload();
  };

  renderSignOutButton = () => {
    if(this.props.user.authenticated){
      return (
        <p onClick={this.handleSignOut}>
          <FaSignOutAlt />
        </p>
      )
    }
  }

  render() {
    return (
      <NavDiv>
        <LeftButtons>
          <Linker>
            <a href='/org'>
              <p>
                <FaHome />
              </p>
            </a>
          </Linker>
        </LeftButtons>
        <h2>Prello</h2>
        <RightButtons>
          <Linker>
          <Link to='/'>
              {this.renderSignOutButton()}
            </Link>
          </Linker>
        </RightButtons>
      </NavDiv>
    )}
  }


function mapStateToProps({ organization, boards, user }) {
  return { organization, boards, user };
}

export default withRouter(connect(
  mapStateToProps,
  actions
)(NavBar));
