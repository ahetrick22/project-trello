import { FETCH_ORG, FETCH_BOARDS } from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';

export const fetchOrg = () => dispatch => {
  dispatch({ type: FETCH_ORG, payload: organizations });
};

export const fetchBoards = () => dispatch => {
  dispatch({ type: FETCH_BOARDS, payload: boards });
};
