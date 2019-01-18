import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from "../Actions";
import { connect } from "react-redux";
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';


class ErrorBoundary extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { error: false, errorInfo: null };
  //   console.log('this.state.error:', this.state.error);
  //   console.log('this.props.error', this.props.error);
  // }

  componentWillReceiveProps() {
    // this.setState({error: true})
    // console.log('this.state.error2:', this.state.error);
    console.log('this.props.erro2r', this.props.error);
    
    }
  

  // You can also log error messages to an error reporting service here

  render() {
    if (this.props.error) {
    console.log(this.props);
      return (
        <ErrorModal>
          <ErrorModalHeader> 
            <p>We're sorry; it looks like something went wrong loading your data.</p>
            {/* <CloseButton>&times;</CloseButton>  */}
          </ErrorModalHeader>
          <ErrorModalContent>           
            <p>Please refresh the page or return home and try again</p>
          </ErrorModalContent>
          <ErrorModalFooter></ErrorModalFooter>
        </ErrorModal>
      )
    }
    else {
      return this.props.children
    }
  }
}
function mapStateToProps({ error }) {
  return { error };
}

export default connect(
  mapStateToProps,
  actions
)(ErrorBoundary);

const ErrorModal = styled.div`
  display: inline-block; 
  position: fixed; /* Stay in place */
  left: 25%;
  top: 25%;
  z-index: 1; /* Sit on top */
  margin: 0 auto;
  width: 50%; 
  height: 25%; 
  border: 3px solid red;
  background-color: ${COLORS.secondary}; 
`;

const ErrorModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 1em;
  font-family: ${TYPEFACE};
  border: 1px solid red;
  width: 80%; 
`;

const ErrorModalHeader = styled.div`
  padding: 2px 16px;
  background-color: red;
  color: white;
`;

const ErrorModalFooter = styled.div`
  padding: 2px 16px;
  background-color: red;
`;

const CloseButton = styled.div`
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
`;
