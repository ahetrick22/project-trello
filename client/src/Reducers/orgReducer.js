import {GET_BOARDS} from '../Actions/index'

/*=====================================================
this reducer will handle the order of boards on a given
organization. most likely will only be one organizaition.
=====================================================*/
export const orgReducer = (state = [], action) => {
  let {payload,type} = action //destructuring
  switch (type) {
    case GET_BOARDS:
    //TODO: get data from server
      return 
    default:
      return state
  }
}