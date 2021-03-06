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
  }

  componentDidMount = async () => {
    await this.props.fetchOrg();
    //this fetchboards currently will only ever return one org boards - NO args
    await this.props.fetchBoards();
  };

  handleInput = input => {
    if (input.key === 'Enter') {
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
      return 'Add Board';
    }
  };
  //fasdfasdfasasdsfdsafddddfdfsd
  render() {
    const { boards, organization } = this.props;

    if (organization === null) {
      return <div>Loading...</div>;
    } else if (!organization._id) {
      return <div>No organization found</div>;
    } else {
      return (
        <div className="org-home" style={{ fontFamily: TYPEFACE }}>
          <OrgInfo>
            <h1>{organization.name}</h1>
          </OrgInfo>
          <OrgBoards>
            <h1>Boards</h1>
            <BoardGrid>
              <BoardList boards={boards} />
              {this.renderInput()}
            </BoardGrid>

            <AddBoardButton
              onClick={() =>
                this.setState({
                  addBoardInputShown: !this.state.addBoardInputShown
                })
              }
            >
              {this.addOrCancel()}
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
  border: 5px outset;
`;

const OrgBoards = styled('div')`
  text-align: center;
  padding: 2em 0;
`;

const BoardGrid = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow: auto;
  flex-wrap: wrap;
  padding: 2em 0;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  text-align: 20%;
`;

const AddBoardButton = styled.button`
  justify-content: center;
  font-size: 1em;
  margin-top: 2em;
  height: 50px;
  width: 100px;
  background-color: ${COLORS.addButtons};
  color: ${COLORS.tertiary};
  border-radius: 10px;

  box-shadow: 1px 1px 15px #999;

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
    width: 80%;
    font-weight: 500;
    font-size: 1.2em;
  }
`;

function mapStateToProps({ boards, organization }) {
  return { boards, organization };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
