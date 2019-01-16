import React from 'react';
import styled from 'styled-components';

const BoardItem = ({ board }) => {
  return <StyledBoardItem href={`/boards/${board._id.$oid}`} className="board">
      <StyledBkgd>{board.name}</StyledBkgd>
    </StyledBoardItem>;
};

export default BoardItem;

const StyledBkgd = styled("div")`
  background-color: #f2f2f2;
  font-family:'Roboto';
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin: 10px;
  color: black;
  width: 170px;
  border-radius: 25px;
  cursor: pointer;
  height: 100px;
  line-height: 100px;
`;

const StyledBoardItem = styled.a`
  margin: 10px;
  text-decoration: none;
  font-weight:600;
  border-radius: 25px;
  background-color: #ffccff;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
