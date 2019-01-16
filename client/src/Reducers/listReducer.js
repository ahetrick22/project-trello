import { FETCH_LISTS } from '../Actions/types';

/*=====================================================
this reducer will manage the order of cards on an individual
list.
=====================================================*/
export const listReducer = (state = [], action) => {
  let { payload, type } = action; //destructuring
  switch (type) {
    case FETCH_LISTS:
      //TODO:get data from server
      return [...state, ...payload];
    default:
      return state;
  }
};
