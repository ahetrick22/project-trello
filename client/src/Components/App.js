import React from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../Actions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.getAllData();
  }
  render() {
    return (
      <div className="app" style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(App)
);
