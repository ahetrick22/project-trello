import { FETCH_ORG, FETCH_BOARDS, FETCH_BOARD, FETCH_LISTS, LOGIN } from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';
import lists from '../hard-coded-data/lists.json';
import users from '../hard-coded-data/users.json'

export const fetchLogin = (email,password) => dispatch => {
  console.log("fetchLOGIN")
  fetch('/login', {
    method: 'POST',
    body: {
    email,
    password,
  }
}).then(res => console.log(res))
  .then(response => {
    console.log(response)
    dispatch({ type: LOGIN, payload: response.data })//depends on what the server returns
    localStorage.setItem({token:response.data.token})

  })
  .catch(error => console.error('Error:', error));
  
}

export const fetchOrg = () => dispatch => {
  dispatch({ type: FETCH_ORG, payload: organizations });
};

export const fetchBoards = () => dispatch => {
  dispatch({ type: FETCH_BOARDS, payload: boards });
};

export const fetchLists = () => dispatch => {
  dispatch({ type: FETCH_LISTS, payload: lists });
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
