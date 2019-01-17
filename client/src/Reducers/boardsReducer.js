import { FETCH_BOARDS, ADD_BOARD } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardsReducer = (state = [], action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_BOARDS:
      //TODO: get data from server
      return [...state, ...payload];
    case ADD_BOARD:
      console.log(payload)
      return state = payload;
    default:
      return state;
  }
};
