import { LOGIN } from '../Actions/types';

export const loginReducer = (state = {}, action) => {
    let { payload, type } = action;
    switch (type) {
        case LOGIN:
        return {...state,...payload}
     default: 
     return state
    }
}