import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  FETCH_CARD_INFO,
  FETCH_LISTS,
  ADD_BOARD
} from './types';
import users from '../hard-coded-data/users.json';
import lists from '../hard-coded-data/lists.json';

export const fetchLogin = (email, password) => dispatch => {
  console.log('fetchLOGIN');
  fetch('/login', {
    method: 'POST',
    body: {
      email,
      password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => console.log(res))
    .then(response => {
      console.log(response);
      dispatch({ type: LOGIN, payload: response.data }); //depends on what the server returns
      localStorage.setItem({ token: response.data.token });
    })
    .catch(error => console.error('Error:', error));
};

export const fetchOrg = orgID => dispatch => {
  fetch(`/organizations/${orgID}`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_ORG, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const fetchBoards = () => dispatch => {
  fetch(`/boards`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_BOARDS, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const fetchLists = () => dispatch => {
  dispatch({ type: FETCH_LISTS, payload: lists });
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

export const addBoard = (organizationId, boardName) => dispatch => {
  console.log(organizationId, boardName);
  fetch(`/organizations/${organizationId}`, {
    method: 'POST',
    body: JSON.stringify({
      name: boardName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch({ type: ADD_BOARD, payload: data.boards });
    });
};
