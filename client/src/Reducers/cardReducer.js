import {GET_CARD_INFO} from '../Actions/index'
/*=====================================================
This reducer handles all the information for a given card,
all comments, logs, etc. Will have to make a new call to the
server most likely for every modal that pops up.
=====================================================*/
export const cardReducer = (state =[] , action) => {
  let { payload, type } = action //destructuring
  switch (type) {
    case GET_CARD_INFO:
      return 
    default:
      return state
  }
}