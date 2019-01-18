import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import * as actions from "../Actions";
import { connect } from "react-redux";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentWillReceiveProps(){
  this.state.error = this.props.error;

}
    // You can also log error messages to an error reporting service here
  
  render() {
    console.log(this.state.error)
    if (this.props.error) {
      console.log("handled")
      return (
        <div>
          We're sorry, looks like something went wrong loading your data. You can try and refreshing the page, or return home and try again
      </div>
      )
    }
    else {
      return this.props.children
    }
  }
}
function mapStateToProps({ error }) {
  return { error };
}

export default connect(
  mapStateToProps,
  actions
)(ErrorBoundary);
