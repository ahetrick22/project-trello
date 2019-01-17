import { FETCH_BOARDS, ADD_BOARD, GET_DATA } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardsReducer = (state = [], action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case GET_DATA:
    console.log(payload)
      //TODO: get data from server
      return state = payload.boards
    case ADD_BOARD:
      console.log(payload);
      return (state = payload);
    default:
      return state;
  }
};
