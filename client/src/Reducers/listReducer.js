import { FETCH_CARDS } from '../Actions/types';

/*=====================================================
this reducer will manage the order of cards on an individual
list.
=====================================================*/
export const listReducer = (state = [], action) => {
  let { payload, type } = action; //destructuring
  switch (type) {
    case FETCH_CARDS:
      //TODO:get data from server
      return;
    default:
      return state;
  }
};
