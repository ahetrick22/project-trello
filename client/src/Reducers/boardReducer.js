import { FETCH_BOARD, ADD_BOARD } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardReducer = (state = {}, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_BOARD:
      return {...state, ...payload};
    case ADD_BOARD:
      return {...state, ...payload};
    default:
      return state;
  }
};
