import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../css/StyleGuide';
import { Link } from 'react-router-dom';


const BoardItem = ({ board ,selectBoard}) => {
  return <Link to={`/boards/${board._id}`}>
      <StyledBoardItem className="board">
        {board.name}
      </StyledBoardItem>
    </Link>;
};

export default BoardItem;

const StyledBoardItem = styled.div`
  cursor: pointer;
  background-color: ${COLORS.primary};
  color: ${COLORS.tertiary};
  height: 100px;
  min-width: 200px;
  margin: 0 5px 0 5px;
  line-height: 100px;
  width: 170px;
  text-decoration: none;
  font-weight: 350;
  border-radius: 25px;
  box-shadow: 1px 1px 15px #999;
  overflow: auto;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
