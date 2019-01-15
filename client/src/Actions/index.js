import { FETCH_ORG, FETCH_BOARDS, FETCH_BOARD, FETCH_LISTS } from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';
import lists from '../hard-coded-data/lists.json';

export const fetchOrg = () => dispatch => {
  dispatch({ type: FETCH_ORG, payload: organizations });
};

export const fetchBoards = () => dispatch => {
  dispatch({ type: FETCH_BOARDS, payload: boards });
};

export const fetchLists = () => dispatch => {
  dispatch({ type: FETCH_LISTS, payload: lists });
};

