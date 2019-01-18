import {FETCH_ERR, LOGIN_ERR} from '../Actions/types'

export const errorReducer = (state = '' , action) => {

  switch (action.type) {
    case FETCH_ERR:
     return state = 'fetch'
     case LOGIN_ERR:
     localStorage.clear()
     return state = 'login'
    default:
      return state
  }
}

