import { FETCH_ORG, FETCH_BOARDS, LOGIN } from './types';
import organizations from '../hard-coded-data/organizations.json';
import boards from '../hard-coded-data/boards.json';
import users from '../hard-coded-data/users.json'

export const fetchLogin = (email,password) => dispatch => {
  console.log("fetchLOGIN")
  fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
    email,
    password,
  }), 
    headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
  dispatch({ type: LOGIN, payload: users})
}

export const fetchOrg = () => dispatch => {
  dispatch({ type: FETCH_ORG, payload: organizations });
};

export const fetchBoards = () => dispatch => {
  dispatch({ type: FETCH_BOARDS, payload: boards });
};
