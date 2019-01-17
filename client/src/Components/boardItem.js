import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../css/StyleGuide';
import { Link } from 'react-router-dom';

const BoardItem = ({ board }) => {
  return (
    <StyledBoardItem to={`/boards/${board._id}`} className="board">
      {board.name}
    </StyledBoardItem>
  );
};

export default BoardItem;

const StyledBoardItem = styled(Link)`
  cursor: pointer;
  background-color: ${COLORS.primary};
  color: ${COLORS.tertiary};
  height: 100px;
  line-height: 100px;
  width: 170px;
  text-decoration: none;
  font-weight: 350;
  border-radius: 25px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
