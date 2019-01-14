import GET_CARDS from '../Actions/index';

/*=====================================================
this reducer will manage the order of cards on an individual
list.
=====================================================*/
export const listReducer = (state = [], action) => {
  let { payload, type } = action //destructuring
  switch ( type ) {
    case GET_CARDS:
    //TODO:get data from server
      return 
    default:
      return state
  }
}