import React from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { TYPEFACE } from '../css/StyleGuide';

class App extends React.Component {
  render() {
    return (
      <div
        className="app"
        style={{
          boxSizing: 'border-box',
          marginTop: '40px',
          fontFamily: TYPEFACE
        }}
      >
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
