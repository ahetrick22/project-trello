import { FETCH_LISTS } from '../Actions/types';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardReducer = (state = [], action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_LISTS:
      //TODO: get data from server
      return;
    default:
      return state;
  }
};
