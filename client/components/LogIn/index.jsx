import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logInUser, signUpUser, removeLoginError } from '../../actions/user';

import Form from './Form';
import Footer from '../Footer';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      password: '',
      passwordConfirmation: '',
      toggleSignUp: true,
      username: '',
    };

    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleSignUp = this.handleToggleSignUp.bind(this);
    this.typeValue = this.typeValue.bind(this);
  }

  handleAvatar(avatar) {
    this.setState({ avatar });
  }

  handleChange(inputName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [inputName]: e.target.value });
      this.props.removeLoginError();
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { avatar, username, password, passwordConfirmation } = this.state;

    if (this.state.toggleSignUp) {
      this.props.signUpUser({
        avatar,
        username: username.trim(),
        password,
        passwordConfirmation,
      });
    } else {
      this.props.logInUser({ username, password });
    }
  }

  handleToggleSignUp(bool) {
    return (
      () => {
        this.props.removeLoginError();
        this.setState({ toggleSignUp: bool });
      }
    );
  }

  handleGuest(e) {
    e.preventDefault();
    this.setState({
      username: '',
      password: 'password',
      toggleSignUp: false,
    }, () => {
      this.typeValue('awesome guest', () => {
        this.props.logInUser({
          username: this.state.username,
          password: this.state.password,
        });
      });
    });
  }

  typeValue(guestName, logInCallback) {
    if (!guestName) return logInCallback();
    this.setState({ username: this.state.username + guestName[0] });
    setTimeout(() => {
      this.typeValue(guestName.slice(1), logInCallback);
    }, 100);
  }

  render() {
    const {
      password,
      passwordConfirmation,
      toggleSignUp,
      username,
    } = this.state;
    const { err } = this.props;

    return (
      <div className="login">
        <section className="login__header">
          <h1 className="login__header--title">{'Let\'s Konnect!'}</h1>
          <div className="login__btns">
            <button
              className={`login__btn--${toggleSignUp ? 'on' : 'off'}`}
              onClick={this.handleToggleSignUp(true)}
            >
              Sign up
            </button>
            <button
              className={`login__btn--${!toggleSignUp ? 'on' : 'off'}`}
              onClick={this.handleToggleSignUp(false)}
            >
              Log in
            </button>
          </div>
        </section>
        <Form
          err={err}
          handleAvatar={this.handleAvatar}
          handleChange={this.handleChange}
          handleGuest={this.handleGuest}
          handleSubmit={this.handleSubmit}
          password={password}
          passwordConfirmation={passwordConfirmation}
          toggleSignUp={toggleSignUp}
          username={username}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  err: state.err,
});

LogIn.propTypes = {
  err: PropTypes.string.isRequired,
  logInUser: PropTypes.func.isRequired,
  removeLoginError: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  logInUser,
  removeLoginError,
  signUpUser,
})(LogIn);
