import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  FETCH_CARD_INFO,
  //  FETCH_LISTS,
  //  ADD_LIST
  ADD_BOARD,
  ADD_CARD
} from './types';

const email = localStorage.getItem('email');
const token = localStorage.getItem('token');

export const fetchLogin = (email, password) => dispatch => {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: LOGIN, payload: response }); //depends on what the server returns
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
    })
    .catch(error => console.error('Error:', error));
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');

  return {
    type: LOGIN,
    payload: ''
  };
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
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      dispatch({ type: LOGIN, payload: response }); //depends on what the server returns
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
    })
    .catch(error => console.error('Error:', error));
};

export const fetchOrg = orgID => dispatch => {
  fetch(`/organizations/${orgID}`, {
    headers: {
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_ORG, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const fetchBoards = () => dispatch => {

  fetch(`/boards`, {
    headers: {
      email: email,
      Authorization: `bearer ${token}`
    }
  })

    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_BOARDS, payload: data });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const fetchBoard = boardID => dispatch => {
  fetch(`/boards/${boardID}`, {
    headers: {
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(res => {
      const resStatus = res.status;
      console.log(resStatus);
      return res.json();
    })
    .then(data => {
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
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
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
      'Content-Type': 'application/json',
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch({ type: ADD_BOARD, payload: data.boards });
    });
};

export const addCard = (listId, cardName) => dispatch => {
  console.log('Add Card');
  fetch(`/list/${listId}`, {
    method: 'POST',
    body: JSON.stringify({
      title: cardName
    }),
    headers: {
      'Content-Type': 'application/json',
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: ADD_CARD, payload: data }));
};

export const addList = (boardId, listName) => dispatch => {
  console.log(boardId, listName);
  fetch(`/board/${boardId}/list`, {
    method: 'POST',
    body: JSON.stringify({
      name: listName
    }),
    headers: {
      'Content-Type': 'application/json',
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('returning data from server add list post: ', data);
      dispatch({ type: ADD_BOARD, payload: data });
    });
};
