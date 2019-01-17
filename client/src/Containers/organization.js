import React, { Component } from 'react';
import BoardList from '../Components/boardList';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS, TYPEFACE } from '../css/StyleGuide';

class Organization extends Component {
  constructor(props) {
    super();
    this.state = {
      addBoardInputShown: false,
      addBoardInput: ''

    };
    //() => this.props.addBoard(organization._id,'123')
    this.renderInput = this.renderInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addOrCancel = this.addOrCancel.bind(this);

  }
  componentDidMount() {
    this.props.fetchBoards();
  }


  handleInput = input => {
    if (input.key == 'Enter') {
      this.props.addBoard(
        this.props.organization._id,
        this.state.addBoardInput
      );
      this.setState({ addBoardInputShown: false, addBoardInput: '' });
    }
  };

  renderInput = () => {
    if (this.state.addBoardInputShown) {
      return (
        <EmptyBoardToAdd>

          <input
            autoFocus
            value={this.state.addBoardInput}
            onKeyPress={e => this.handleInput(e)}
            onChange={e => this.setState({ addBoardInput: e.target.value })}
          />
        </EmptyBoardToAdd>
      );

    }
  };

  addOrCancel = () => {
    if (this.state.addBoardInputShown) {
      return 'Cancel';
    } else {
      return 'New Board';
    }
  };

  render() {

    const { boards } = this.props;


    if (Object.keys(boards).length === 0) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="org-home" style={{ fontFamily: TYPEFACE }}>
          <OrgInfo>
            <h1>{boards[0].organization.name}</h1>
          </OrgInfo>
          <OrgBoards>
            <h1>Boards</h1>
            <BoardGrid>
              <BoardList boards={boards} />
              {this.renderInput()}
            </BoardGrid>
            <button
              onClick={() =>
                this.props.addBoard('5c3fafdf44ae364f70407ec6', 'DEM BOYZ')
              }
            >
              Button
            </button>

            <AddBoardButton
              onClick={() =>
                this.setState({
                  addBoardInputShown: !this.state.addBoardInputShown
                })
              }
            >
              Add Board
            </AddBoardButton>
          </OrgBoards>
        </div>
      );

    }
  }
}

const OrgInfo = styled('div')`
  text-align: center;
  font-size: 1.75em;
  height: 30vh;
  line-height: 30vh;
  background-color: ${COLORS.secondary};
`;

const OrgBoards = styled('div')`
  text-align: center;
  height: 60vh;
  padding: 2em 0;
`;

const BoardGrid = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: nowrap;
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
  cursor: pointer;
`;

const EmptyBoardToAdd = styled.div`
  cursor: pointer;
  background-color: ${COLORS.primary};
  font-family: ${TYPEFACE};

  color: ${COLORS.tertiary};
  height: 100px;
  line-height: 100px;
  width: 170px;
  text-decoration: none;

  border-radius: 25px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
  input {
    height: 30%;
    background-color: white;
    margin: 0 5px 0 5px;
    width: 75%;
    font-weight: 500;
    font-size: 1.2em;
  }
`;

function mapStateToProps({ boards }) {
  return { boards };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
