import { FETCH_BOARD, ADD_BOARD, UPDATE_BOARD } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardReducer = (state = {}, action) => {
  let { payload, type } = action; //destructuring
  // if(payload) {
  //   let filteredData = payload.lists.map(list => {
  //     return list.cards.filter(card => card.archived === false);
  //   });
  //
  //  payload.filteredLists = filteredData;
  //
  // }

  switch (type) {
    case FETCH_BOARD:
      return { ...state, ...payload };
    case ADD_BOARD:
      return { ...state, ...payload };
    case UPDATE_BOARD:
      return { ...state, ...payload };
    default:
      return state;
  }
};
