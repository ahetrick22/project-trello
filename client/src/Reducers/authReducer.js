import { AUTH_USER, AUTH_ERROR } from '../Actions/types';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  email: localStorage.getItem('email') || '',
  errorMessage: ''
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        email: action.payload.email
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
