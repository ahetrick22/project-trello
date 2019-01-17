import { FETCH_BOARDS, ADD_BOARD } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardsReducer = (state = null, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_BOARDS:
      console.log(payload)
      return [...payload];
    case ADD_BOARD:
      console.log(payload);
      return (state = payload);
    default:
      return state;
  }
};
