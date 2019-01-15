import { FETCH_ORG, FETCH_BOARDS, FETCH_BOARD } from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';

export const fetchOrg = () => dispatch => {
  dispatch({ type: FETCH_ORG, payload: organizations });
};

export const fetchBoards = () => dispatch => {
  dispatch({ type: FETCH_BOARDS, payload: boards });
};

export const fetchBoard = boardID => dispatch => {
  fetch(`/board/${boardID}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    dispatch({type: FETCH_BOARD, payload: data})
  })
  .catch(err => {
    if(err) throw err;
  })
}