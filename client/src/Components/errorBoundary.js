import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          We're sorry, looks like something went wrong loading your data. You can try and refreshing the page, or return home and try again
      <Redirect to='/' />
      </div>
      )
    }
    else {
      return this.props.children
    }
  }
}
