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
    this.props.fetchOrg();
    //this fetchboards currently will only ever return one org boards - NO args
    this.props.fetchBoards();
  }


  handleInput = input => {
    if (input.key === 'Enter') {
      this.props.addBoard(
        this.props.boards[0].organization._id,
        this.state.addBoardInput
      );
      console.log(this.props)
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

    const { boards, organization } = this.props;
    console.log(this.props)

    if(organization === null) {
      return <div>Loading...</div>;
    }
    else if (!organization._id) {
      return <div>No organization found</div>
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
  overflow-x: scroll;
  overflow-y: auto;
  flex-wrap: nowrap;
  padding: 2em 0;
  padding-left: 10px;
  width: 100%;
  text-align: 20%;
  
`

const AddBoardButton = styled.button`
  justify-content: center;
  font-size: 1em;
  margin-top: 3em;
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
  width: 300px;
  text-decoration: none;
  min-width: 200px;

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
