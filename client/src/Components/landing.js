import React, { Component, Fragment } from "react";
import * as actions from "../Actions";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    while (!this.props.organization){
      this.props.fetchOrg('5c3fd62510515d4778d0d367');

    }
  }

  render() {
    console.log(this.props)
    let authenticated= this.props;
    return (
      <div>hi</div>
    )
  }
}

const mapStateToProps = ({ user, organization }) => {

  return {
    user,
    organization
  };
};

export default connect(
  mapStateToProps,
  actions
)(Landing);

