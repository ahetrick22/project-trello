import {
  FETCH_ORG,
  FETCH_BOARDS,
  FETCH_BOARD,
  LOGIN,
  LOGOUT,
  FETCH_CARD_INFO,
  //  FETCH_LISTS,
  //  ADD_LIST
  ADD_BOARD,
  LOGIN_ERR,
  // ADD_CARD,
  FETCH_ERR,
  EMAIL_ERR
} from './types';

const email = localStorage.getItem('email');
const token = localStorage.getItem('token');

export const fetchLogin = (email, password) => dispatch => {
  fetch('/api/login', {
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
    .catch(() => dispatch({ type: LOGIN_ERR, data: {} }));
};

export const signout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('token');

  return {
    type: LOGOUT,
    payload: ''
  };
};

export const fetchRegister = (email, password) => dispatch => {
  fetch('/api/register', {
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
      if(response.error){
        dispatch({type:EMAIL_ERR,data:{}})
      } else {
      dispatch({ type: LOGIN, payload: response }); //depends on what the server returns
    }})
    .catch(() => dispatch({ type: EMAIL_ERR, data: {} }));
};

export const fetchOrg = orgID => async dispatch => {

    fetch(`/api/organizations`, {
      headers: {
        email: email,
        Authorization: `bearer ${token}`
      }
    }).then(r => r.json())
      .then(data => {
          dispatch({ type: FETCH_ORG, payload: data });
        }).catch(res => {
          console.log(res)
          dispatch({ type: FETCH_ERR, payload: {} });
        })
  
};

export const fetchBoards = () => async dispatch => {
    fetch(`/api/boards`, {
      headers: {
        email: email,
        Authorization: `bearer ${token}`
      }
    })
      .then(r => {
        console.log(r.status)
        if(r.status === 401){
          console.log(401111)
          return dispatch({type:LOGIN_ERR, payload:{}})
        }
        return r.json()
      })
      .then(data => dispatch({ type: FETCH_BOARDS, payload: data }))
      .catch(res => {
        console.log(res)
        dispatch({ type: FETCH_ERR, payload: {} });
      });
  
};

export const fetchBoard = boardID => dispatch => {
  fetch(`/api/boards/${boardID}`, {
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
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const fetchCard = cardID => dispatch => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  fetch(`/api/card/${cardID}`, {
    headers: {
      email: email,
      Authorization: `bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('fetch card data', data);
      dispatch({ type: FETCH_CARD_INFO, payload: { data, id: cardID } });
    })
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const addBoard = (organizationId, boardName) => dispatch => {
  console.log(organizationId, boardName);
  fetch(`/api/organizations/${organizationId}`, {
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
    })
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const addCard = (listId, cardName) => dispatch => {
  fetch(`/api/list/${listId}/card`, {
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
    .then(data => {
      console.log('response from addCard: Data= ', data);
      dispatch({ type: ADD_BOARD, payload: data });
    })
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const addList = (boardId, listName) => dispatch => {
  fetch(`/api/board/${boardId}/list`, {
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
    })
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const updateList = (listID, listName) => dispatch => {
  fetch(`/api/list/${listID}`, {
    method: 'PUT',
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
      dispatch({ type: ADD_BOARD, payload: data });
    })
    .catch(() => dispatch({ type: FETCH_ERR, data: {} }));
};

export const updateCard = (cardId, propsToUpdate) => dispatch => {
  console.log('THINGS', cardId, propsToUpdate);
  fetch(`/api/card/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      email: email,
      Authorization: `bearer ${token}`
    },
    body: JSON.stringify(propsToUpdate)
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: FETCH_CARD_INFO, payload: { data, id: cardId } });
    });
};

export const updateBoard = (boardId, boardName) => dispatch => {
  fetch(`/api/board/${boardId}`, {
    method: 'PUT',
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
      dispatch({ type: ADD_BOARD, payload: data });
    });
};
