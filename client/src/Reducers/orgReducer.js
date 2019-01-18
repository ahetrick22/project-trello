import { FETCH_ORG } from '../Actions/types';

/*=====================================================
this reducer will handle the order of boards on a given
organization. most likely will only be one organizaition.
=====================================================*/
export const orgReducer = (state = null, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_ORG:
      //TODO: get data from server
      return { ...state, ...payload };
    // case FETCH_BOARDS:
    //   return { ...state, ...payload };
    default:
      return state;
  }
};
