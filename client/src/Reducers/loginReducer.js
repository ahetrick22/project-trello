import { LOGIN, LOGOUT } from '../Actions/types';

const INITIAL_STATE = {
    authenticated: localStorage.getItem('token') || '',
    email: '',
    errorMessage: ''
};

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            return {
                ...state, authenticated: action.payload.token,
                email: action.payload.email
            };
            case LOGOUT:
            return state = INITIAL_STATE
        // case AUTH_ERROR:
        //     return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}