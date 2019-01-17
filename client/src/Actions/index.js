import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  FETCH_CARD_INFO,
  FETCH_LISTS,
  ADD_BOARD,
  ADD_LIST
} from './types';

export const fetchLogin = (email, password) => dispatch => {
  fetch('/login', {
    method: 'POST',
    body: {
      email,
      password
    },
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => console.log(res))
    .then(response => {
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

export const fetchBoard = boardID => dispatch => {
  fetch(`/board/${boardID}`)
    .then(res => res.json())
    .then(data => {
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
  });
};

export const addList = (boardId, listName) => dispatch => {
  console.log(boardId, listName);
  fetch(`/board/${boardId}/list`, {
    method: 'POST',
    body: JSON.stringify({
      name: listName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('returning data from server add list post: ', data);
      dispatch({ type: ADD_BOARD, payload: data });
    });
};
