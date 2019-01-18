import React, { Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import Login from './auth/login';
import NavBar from '../Containers/nav';

class App extends React.Component {
  render() {
    let { authenticated } = this.props.user;
    if (authenticated) {
      return (
          <div className="app" style={{ boxSizing: "border-box" }}>
            {this.props.children}
          </div>
      )

    } else {
      return (
        <Fragment>
          <Redirect to='/login' />
          <NavBar />
          <h1>You have been redirected because you aren't currently logged in >:(</h1>
          <Login />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);
