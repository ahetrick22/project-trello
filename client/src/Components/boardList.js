import React, {Fragment} from 'react';
import BoardItem from './boardItem';

const BoardList = ({ boards }) => {
  return <Fragment>
      
        {boards.map((board, index) => (
          <BoardItem board={board} key={index} />
        ))}
      
    </Fragment>;
};

export default BoardList;