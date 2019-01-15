import React, { Component } from 'react';
import *  as actions from '../Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Board extends Component {

  componentDidMount = async () => {
    const {boardID} = this.props.match.params;
    console.log(boardID);
    await this.props.fetchBoard(boardID);
  }

  render() {
    if (!this.props.board) {
      return <div>Loading...</div>
    } else { 
      console.log('board props',this.props.board.name);
    return (
      <>
      <h1>{this.props.board.name}</h1>
    
      </>
    )
    }
  }
} 

const mapStateToProps = state => {
  return {
    board: state.board
  }
}

export default connect(mapStateToProps, actions)(Board);

// List items should render horizonatally across the board
// Akin to organization home, have some sort of border to keep a sense of containment
// Expect to map over an array of listItems
// This will need a local state for the drag and dropping of list items
// Include a button on the right of all lists to allow for a new list to be added