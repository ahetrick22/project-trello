import React from 'react';
import styled from 'styled-components';
import BoardItem from './boardItem';

const BoardList = ({ boards }) => {
  return (
    <StyledBoardList>
      {boards.map((board, index) => (
        <BoardItem board={board} key={index} />
      ))}
    </StyledBoardList>
  );
};

export default BoardList;

const StyledBoardList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em 0;
`;
