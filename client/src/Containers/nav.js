import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FlexContainer from 'react-styled-flexbox'
import { FaHome, FaFlipboard } from "react-icons/fa"
import {Link} from 'react-router-dom'
import { orgReducer } from '../Reducers/orgReducer';



const NavDiv = styled.div`
  font-family: 'Roboto', sans-serif;
  display:flex;
  flex-direction:column;
  font-size: 1em;
  height: 100%;
  margin: 0;
  padding: 0;

`;

const Header = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color:#3f51b5;
`
const Logo = styled.div`
  font-weight: 700;
  font-size:20px;
  padding: 0 10px;
  float: left;
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
 float: left;
  
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


  render() {
    console.log(this.props);
    return <NavDiv>
        <Header>
          <Logo>
            <Link to="/">
              <FaHome />
            </Link>
          </Logo>
          <Menu>
            <a href={this.props.organization.organization.id} >
              <FaFlipboard /> Boards
            </a>
          </Menu>
        </Header>
      </NavDiv>;
  }
}

const mapStateToProps = (organization) => ({
  organization,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, null)(NavBar)
