import { FETCH_ERR } from '../Actions/types';

export const errorReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_ERR:
      return state;
    default:
      return state;
  }
};
