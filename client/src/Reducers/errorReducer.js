import {FETCH_ERR, LOGIN_ERR, LOGIN, EMAIL_ERR} from '../Actions/types'

export const errorReducer = (state = '' , action) => {

  switch (action.type) {
    
     case LOGIN_ERR:
      localStorage.removeItem('token');
      localStorage.removeItem('email');
     return state = 'login'
     case EMAIL_ERR:
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      return state = 'email_err'
      case FETCH_ERR:
      return state = 'fetch'
     case LOGIN:
     return state = '';
    default:
      return state
  }
}

