import React from 'react';
import styled from 'styled-components';

const BoardItem = ({ board }) => {
  return (
    <StyledBoardItem href={`/boards/${board._id.$oid}`} className="board">
      {board.name}
    </StyledBoardItem>
  );
};

export default BoardItem;

const StyledBoardItem = styled.a`
  text-decoration: none;
  color: black;
  width: 170px;
  border-radius: 25px;
  cursor: pointer;
  height: 100px;
  border 1px solid black;
  line-height: 100px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
