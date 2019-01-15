import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchLogin } from "../../Actions/index";


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = props => {
    this.props.login(props, () => {
      this.props.history.push("/orgs/5c3d0a12c905af1b29c57f06");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form validate-form">
              <span className="welcome login100-form-title p-b-26">
                Welcome
					</span>
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font"></i>
              </span>
              <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                <input className="input100" type="text" name="email" value={this.state.email} onChange={event =>
                  this.setState({ email: event.target.value })}  />
                <span className="focus-input100" data-placeholder="Email"></span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Enter password">
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye"></i>
                </span>
                <input className="input100" type="password" name="pass" value={this.state.password} onChange={event =>
                  this.setState({ password: event.target.value })}  />
                <span className="focus-input100" data-placeholder="Password"></span>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" onClick={() => this.props.login(this.state.email,this.state.password)}>
                    Login
							</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login: fetchLogin
};

export default connect(
  null,
  mapDispatchToProps
)(login);
