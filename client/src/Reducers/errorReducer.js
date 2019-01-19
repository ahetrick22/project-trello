
import {FETCH_ERR, LOGIN_ERR, LOGIN} from '../Actions/types'



export const errorReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_ERR:

     return state = 'fetch'
     case LOGIN_ERR:
     localStorage.clear()
     return state = 'login'
     case LOGIN:
     return state = '';
    default:
      return state;
  }
};
