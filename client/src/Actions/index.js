/*=====================================================
these are the various action TYPES that will be used 
to determine what action happened so the reducers can know
what to do. done like this to ensure consistency and prevent
typos, errors, etc.
=====================================================*/

//login
export const LOGIN = "LOGIN";
//for the org reducer
export const GET_BOARDS = "GET_BOARDS";
//for the board reducer
export const GET_LISTS = "GET_LISTS";
//for the list reducer
export const GET_CARDS = "GET_CARDS";
//for the card reducer
export const GET_CARD_INFO = "GET_CARD_INFO";