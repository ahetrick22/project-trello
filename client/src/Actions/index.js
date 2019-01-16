import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  FETCH_CARD_INFO
} from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';
import users from '../hard-coded-data/users.json';

export const fetchLogin = (email, password) => dispatch => {
  console.log('fetchLOGIN');
  fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  dispatch({ type: LOGIN, payload: users });
};

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
      dispatch({ type: FETCH_BOARD, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const fetchCard = cardID => dispatch => {
  fetch(`/card/${cardID}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch({ type: FETCH_CARD_INFO, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};
