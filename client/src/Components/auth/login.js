import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { Link } from "react-router-dom";
import * as actions from '../../Actions';
import { connect } from "react-redux";




const Title = styled.div`
    padding-top: 50px;
    padding-left: 555px;
    font-size: 20px;`


const Button = styled.button`
    border:0;
    border-radius:5px;
    font-size:1.5em;
    font-weight:600;
    margin:10px;
    padding:5px;`

const LoginButton = styled.button`
    background-color: #4CAF50;`

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
    this.props.fetchLogin((this.state.email, this.state.password), () => {
      this.props.history.push("/orgs/5c3d0a12c905af1b29c57f06");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <LoginCss>
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
                    this.setState({ email: event.target.value })} />
                  <span className="focus-input100" data-placeholder="Email"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <span className="btn-show-pass">
                    <i className="zmdi zmdi-eye"></i>
                  </span>
                  <input className="input100" type="password" name="pass" value={this.state.password} onChange={event =>
                    this.setState({ password: event.target.value })} />
                  <span className="focus-input100" data-placeholder="Password"></span>
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>

                    <button className="login100-form-btn" onClick={() => this.props.fetchLogin(this.state.email, this.state.password)}>
                      Login
						    	</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoginCss>
    );
  }
}

const LoginCss = styled("div")`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
  }

  p {
    font-family: Cambria;
    font-size: 14px;
    line-height: 1.7;
    color: #666666;
    margin: 0px;
  }

  ul,
  li {
    margin: 0px;
    list-style-type: none;
  }

  /*---------------------------------------------*/
  input {
    outline: none;
    border: none;
  }

  textarea {
    outline: none;
    border: none;
  }

  textarea:focus,
  input:focus {
    border-color: transparent !important;
  }

  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  input:focus:-moz-placeholder {
    color: transparent;
  }
  input:focus::-moz-placeholder {
    color: transparent;
  }
  input:focus:-ms-input-placeholder {
    color: transparent;
  }

  textarea:focus::-webkit-input-placeholder {
    color: transparent;
  }
  textarea:focus:-moz-placeholder {
    color: transparent;
  }
  textarea:focus::-moz-placeholder {
    color: transparent;
  }
  textarea:focus:-ms-input-placeholder {
    color: transparent;
  }

  input::-webkit-input-placeholder {
    color: #adadad;
  }
  input:-moz-placeholder {
    color: #adadad;
  }
  input::-moz-placeholder {
    color: #adadad;
  }
  input:-ms-input-placeholder {
    color: #adadad;
  }

  textarea::-webkit-input-placeholder {
    color: #adadad;
  }
  textarea:-moz-placeholder {
    color: #adadad;
  }
  textarea::-moz-placeholder {
    color: #adadad;
  }
  textarea:-ms-input-placeholder {
    color: #adadad;
  }

  /*---------------------------------------------*/
  button {
    outline: none !important;
    border: none;
    background: transparent;
  }

  button:hover {
    cursor: pointer;
  }

  iframe {
    border: none !important;
  }

  /*//////////////////////////////////////////////////////////////////
[ Utility ]*/
  .txt1 {
    font-family: Cambria;
    font-size: 13px;
    color: #666666;
    line-height: 1.5;
  }

  .txt2 {
    font-family: Cambria;
    font-size: 13px;
    color: #333333;
    line-height: 1.5;
  }

  /*//////////////////////////////////////////////////////////////////
[ login ]*/

  .limiter {
    width: 100%;
    margin: 0 auto;
  }

  .container-login100 {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: #f2f2f2;
  }

  .wrap-login100 {
    width: 390px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 77px 55px 33px 55px;

    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  }

  /*------------------------------------------------------------------
[ Form ]*/

  .login100-form {
    width: 100%;
  }

  .login100-form-title {
    display: block;
    font-family: Cambria;
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 15px;
  }
  .login100-form-title i {
    font-size: 60px;
  }

  /*------------------------------------------------------------------
[ Input ]*/

  .wrap-input100 {
    width: 100%;
    position: relative;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
  }

  .input100 {
    font-family: Cambria;
    font-size: 15px;
    color: #555555;
    line-height: 1.2;

    display: block;
    width: 100%;
    height: 45px;
    background: transparent;
    padding: 0 5px;
  }

  /*---------------------------------------------*/
  .focus-input100 {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .focus-input100::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

    background: #6a7dfe;
    background: -webkit-linear-gradient(left, #21d4fd, #b721ff);
    background: -o-linear-gradient(left, #21d4fd, #b721ff);
    background: -moz-linear-gradient(left, #21d4fd, #b721ff);
    background: linear-gradient(left, #21d4fd, #b721ff);
  }

  .focus-input100::after {
    font-family: Cambria;
    font-size: 15px;
    color: #999999;
    line-height: 1.2;

    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: -16px;
    left: 0px;
    padding-left: 5px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  /* .input100:focus + .focus-input100::after {
  top: -15px;
}

.input100:focus + .focus-input100::before {
  top: -15px;
}

.has-val.input100 + .focus-input100::after {
  top: -15px;
}

.has-val.input100 + .focus-input100::before {
  top: -15px;
} */

  /*---------------------------------------------*/
  .btn-show-pass {
    font-size: 15px;
    color: #999999;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    padding-right: 5px;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .btn-show-pass:hover {
    color: #6a7dfe;
    color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
    color: -o-linear-gradient(left, #21d4fd, #b721ff);
    color: -moz-linear-gradient(left, #21d4fd, #b721ff);
    color: linear-gradient(left, #21d4fd, #b721ff);
  }

  .btn-show-pass.active {
    color: #6a7dfe;
    color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
    color: -o-linear-gradient(left, #21d4fd, #b721ff);
    color: -moz-linear-gradient(left, #21d4fd, #b721ff);
    color: linear-gradient(left, #21d4fd, #b721ff);
  }

  /*------------------------------------------------------------------
[ Button ]*/
  .container-login100-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 13px;
  }

  .wrap-login100-form-btn {
    width: 100%;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
    margin: 0 auto;
  }

  .login100-form-bgbtn {
    position: absolute;
    z-index: -1;
    width: 300%;
    height: 100%;
    background: #a64bf4;
    background: -webkit-linear-gradient(
      right,
      #21d4fd,
      #b721ff,
      #21d4fd,
      #b721ff
    );
    background: -o-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
    background: -moz-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
    background: linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
    top: 0;
    left: -100%;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .login100-form-btn {
    font-family: Cambria;
    font-size: 15px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 50px;
  }

  .wrap-login100-form-btn:hover .login100-form-bgbtn {
    left: 0;
  }

  /*------------------------------------------------------------------
[ Responsive ]*/

  @media (max-width: 576px) {
    .wrap-login100 {
      padding: 77px 15px 33px 15px;
    }
  }

  /*------------------------------------------------------------------
[ Alert validate ]*/

  .validate-input {
    position: relative;
  }

  .alert-validate::before {
    content: attr(data-validate);
    position: absolute;
    max-width: 70%;
    background-color: #fff;
    border: 1px solid #c80000;
    border-radius: 2px;
    padding: 4px 25px 4px 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0px;
    pointer-events: none;

    font-family: Cambria;
    color: #c80000;
    font-size: 13px;
    line-height: 1.4;
    text-align: left;

    visibility: hidden;
    opacity: 0;

    -webkit-transition: opacity 0.4s;
    -o-transition: opacity 0.4s;
    -moz-transition: opacity 0.4s;
    transition: opacity 0.4s;
  }

  .alert-validate::after {
    content: "\f06a";
    font-family: FontAwesome;
    font-size: 16px;
    color: #c80000;

    display: block;
    position: absolute;
    background-color: #fff;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 5px;
  }

  .alert-validate:hover:before {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 992px) {
    .alert-validate::before {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const mapStateToProps = ({user}) => {
  return {
    user
  }
}


export default connect(
  mapStateToProps,
  actions
)(login);
