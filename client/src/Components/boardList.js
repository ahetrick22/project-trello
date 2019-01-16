import React, { Fragment } from 'react';
import styled from 'styled-components';
import BoardItem from './boardItem';
import AddBoardItem from './addBoardItem'

const BoardList = ({ boards }) => {
  return (
    <Fragment>
     
        {boards.map((board, index) => (
          <BoardItem board={board} key={index} />
        ))}<AddBoardItem/>

    </Fragment>
  );
};

export default BoardList;

