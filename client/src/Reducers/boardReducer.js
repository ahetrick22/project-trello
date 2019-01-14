import {GET_LISTS} from '../Actions/index';

/*=====================================================
This reducer will handle the whole board object,
that is - the list of lists on the individual board
=====================================================*/
export const boardReducer = (state =[] , action) => {
  let { payload, type } = action //destructuring

  switch (type) {
    case GET_LISTS:
    //TODO: get data from server
      return 
    default:
      return state
  }
}