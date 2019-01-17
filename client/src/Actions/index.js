import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  FETCH_CARD_INFO,
  FETCH_LISTS,
  ADD_BOARD,
  REGISTER
} from './types';
import users from '../hard-coded-data/users.json';
import lists from '../hard-coded-data/lists.json';

export const fetchLogin = (email, password) => dispatch => {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: LOGIN, payload: response }); //depends on what the server returns
      localStorage.setItem('token',response.token);
      localStorage.setItem('email', response.email);
    })
    .catch(error => console.error('Error:', error));
};

export const fetchRegister = (email, password) => dispatch => {
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      dispatch({ type: LOGIN, payload: response }); //depends on what the server returns
      localStorage.setItem('token',response.token);
      localStorage.setItem('email', response.email);
    })
    .catch(error => console.error('Error:', error));
};


export const fetchOrg = () => dispatch => {
  fetch(`/organizations`)
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
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  fetch(`/card/${cardID}`, {
    headers: {
      "email": email,
      "token": `bearer ${token}`
    }
  })
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
  console.log(organizationId, boardName)
   fetch(`/organizations/${organizationId}`,{
    method:'POST',
    body:JSON.stringify({
      name:boardName
    }), headers: {
      "Content-Type": "application/json"}
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    dispatch({type:ADD_BOARD,payload:data.boards})
  })
}


