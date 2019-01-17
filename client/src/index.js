import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { render } from 'react-dom';
import NavBar from './Containers/nav';
import App from './Components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './Reducers/rootReducer';
import Login from './Components/auth/login';
import Organization from './Containers/organization';
import Board from './Containers/board';
import CardDetail from './Containers/cardDetail';

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

const loggedIn = () => {
  // TODO: Check if user is logged in
};

render(
  <Provider store={store}>
    <Router>
      <App>
        <NavBar />
        <Switch>
          {/* TODO: root path should either be login page or org page depending on if user is logged in or not */}
          {/* <Redirect exact from='/' to='/login' /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/orgs/:orgID" component={Organization} />
          <Route exact path="/boards/:boardID" component={Board} />
          <Route exact path="/cards/:cardID" component={CardDetail} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
