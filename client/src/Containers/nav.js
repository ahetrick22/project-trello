import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';
//import FlexContainer from 'react-styled-flexbox';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
//import { Link } from 'react-router-dom';
import * as actions from '../Actions';

const NavDiv = styled.div`
  color: ${COLORS.primary};
  font-family: ${TYPEFACE};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${COLORS.tertiary};
  background-color: green;
  align-items: center;
  font-size: 2em;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const LeftButtons = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 1.25em;
`;

const RightButtons = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  color: ${COLORS.tertiary};
`;

const Brand = styled.div`
  color: ${COLORS.tertiary};
`;
//not using since created another blob next to icon
// const Logo = styled.div`
//   font-weight: 700;
//   font-size: 20px;
//   padding: 0 10px;
//   color: white;
//   :hover {
//     background-color: #5b68ad;
//     border-radius: 15px;
//   }
//   img {
//     height: 100%;
//     padding-bottom: -10px;
//   }
// `;

const Linker = styled.div`
  a {
    padding: 0 10px;
    color:white;
    text-decoration: none;  
  }
  a:hover {
    color: #c5cae9;
  }
}
`;

//Still needs some work but is a functioning navBar

export class NavBar extends Component {
  constructor(props) {
    super(props);
      
  }
   handleSignOut = () => {
    this.props.signout();
    console.log(this.props);
    
  };

  render() {
    return (
      <NavDiv>
        <LeftButtons>
          <Linker>
            <a href="#">
              <FaHome />
            </a>
          </Linker>
        </LeftButtons>
        <Brand>Trello</Brand>
        <RightButtons>
          <Linker>
            <a href="#" onClick={this.handleSignOut}>
              <FaSignOutAlt />
            </a>
          </Linker>
        </RightButtons>
      </NavDiv>
    );
  }
}

function mapStateToProps({ organization, boards }) {
  return { organization, boards };
}

export default connect(
  mapStateToProps,
  actions
)(NavBar);
