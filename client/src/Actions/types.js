/*=====================================================
these are the various action TYPES that will be used 
to determine what action happened so the reducers can know
what to do. done like this to ensure consistency and prevent
typos, errors, etc.
=====================================================*/

//login
export const LOGIN = 'LOGIN';
//for the org reducer
export const FETCH_BOARDS = 'FETCH_BOARDS';

export const FETCH_ORG = 'FETCH_ORG';
//for the board reducer
export const FETCH_BOARD = 'FETCH_BOARD';
//for the list reducer
export const FETCH_CARDS = 'FETCH_CARDS';
//for the card reducer
export const FETCH_CARD_INFO = 'FETCH_CARD_INFO';

export const FETCH_LISTS = 'FETCH_LISTS';

export const ADD_BOARD = 'ADD_BOARD';

export const REGISTER = 'REGISTER';

export const ADD_CARD = 'ADD_CARD';

export const ADD_LIST = 'ADD_LIST';

// for auth reducer
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

//errors

export const FETCH_ERR = 'FETCH_ERR'
