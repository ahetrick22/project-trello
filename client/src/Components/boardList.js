import React, { Fragment } from 'react';
import styled from 'styled-components';
import BoardItem from './boardItem';

const BoardList = ({ boards }) => {
  return (
    <Fragment>
      <StyledBoardList className="board-list">
        {boards.map((board, index) => (
          <BoardItem board={board} key={index} />
        ))}
      </StyledBoardList>
    </Fragment>
  );
};

export default BoardList;

const StyledBoardList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;
