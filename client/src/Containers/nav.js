import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FlexContainer from 'react-styled-flexbox'
import { FaHome, FaFlipboard } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { orgReducer } from '../Reducers/orgReducer';
import * as actions from "../Actions";




const NavDiv = styled.div`
  font-family: 'Roboto', sans-serif;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  border:1px solid red;
  background-color:green;
  align-items:center;
  font-size: 1em;
  height: 100%;
  width:100%;
  margin: 0;
  padding: 0;

`;

const LeftButtons = styled.div`
display:flex;
flex-direction:row;
padding:10px;
font-size:1.25em;

`  

const RightButtons = styled.div`

`

const Brand = styled.div`

`

const Logo = styled.div`
  font-weight: 700;
  font-size:20px;
  padding: 0 10px;
  color:white;
  :hover{
    background-color:#5b68ad;
    border-radius:15px;
  }
  img{
    height:100%;
    padding-bottom:-10px;
  }
`

const Menu = styled.div`
  
  a {
    padding: 0 10px;
    color:white;
    text-decoration: none;  
  }
  a:hover {
    color: #c5cae9;
  }
}
`

//Still needs some work but is a functioning navBar

export class NavBar extends Component {

  componentDidMount() {
    this.props.fetchOrg();
  }




  render() {
    console.log(this.props);
    return <NavDiv>
        <LeftButtons>
          <Logo />
          <Menu>
            <a href='#'>
              <FaHome />
            </a>
          </Menu>
        </LeftButtons>
        <Brand>Trello</Brand>
        <RightButtons>SignOut</RightButtons>
      </NavDiv>;
  }
}

function mapStateToProps({ organization, boards }) {
  return { organization, boards };
}

export default connect(
  mapStateToProps,
  actions
)(NavBar)

