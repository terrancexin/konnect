import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  logInUser,
  signUpUser,
  removeErrorMessage
} from '../../actions';
import Form from './Form';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: 'password',
      passwordConfirmation: 'password',
      toggleLogin: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
  }
  
  handleToggleLogin(toggleLogin) {
    this.setState({ toggleLogin });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirmation } = this.state;
    this.state.toggleLogin === 'signup' 
      ? this.props.signUpUser({ username, password, passwordConfirmation })
      : this.props.logInUser({ username, password });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleChange(inputName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [inputName]: e.target.value });
      this.props.removeErrorMessage();
    };
  }

  render() {
    const { username, password, passwordConfirmation, toggleLogin } = this.state;
    const { err } = this.props;

    return (
      <div className="login-page">
        <section className="login-header">
          <h1 className="konnect-title">
            Let's Konnect!
          </h1>
          <div className="login-btns">
            <button className="signup-btn" onClick={() => this.handleToggleLogin('signup')}>
              Sign up
            </button>
            <button className="login-btn" onClick={() => this.handleToggleLogin('login')}>
              Log in
            </button>
          </div>
        </section>
          <Form
            err={err}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            password={password}
            passwordConfirmation={passwordConfirmation}
            toggleLogin={toggleLogin}
            username={username}
          />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({ err: state.err })
};

export default connect(mapStateToProps, {
  removeErrorMessage,
  signUpUser,
  logInUser
})(LogIn);
