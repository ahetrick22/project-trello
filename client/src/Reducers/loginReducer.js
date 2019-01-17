import { LOGIN } from '../Actions/types';

const INITIAL_STATE = {
    authenticated: localStorage.getItem('token') || '',
    email: '',
    errorMessage: ''
};

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state, authenticated: action.payload.token,
                email: action.payload.email
            };
        // case AUTH_ERROR:
        //     return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}