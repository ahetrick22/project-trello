import { FETCH_ORG, GET_DATA } from '../Actions/types';

/*=====================================================
this reducer will handle the order of boards on a given
organization. most likely will only be one organizaition.
=====================================================*/
export const orgReducer = (state = {}, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case GET_DATA:
      //TODO: get data from server
      return state =  {...payload };
    // case FETCH_BOARDS:
    //   return { ...state, ...payload };
    default:
      return state;
  }
};
