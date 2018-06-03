import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logInUser, signUpUser, removeErrorMessage } from '../../actions';
import Form from './Form';
import Footer from '../Footer';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      avatar: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      toggleSignUp: true,
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
      this.props.removeErrorMessage();
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
    this.props.removeErrorMessage();
    this.setState({ toggleSignUp: bool });
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

  typeValue(guestName, callback) {
    if (!guestName) return callback();
    this.setState({ username: this.state.username + guestName[0] });
    setTimeout(() => {
      this.typeValue(guestName.slice(1), callback);
    }, 100);
  }

  render() {
    const {
      username,
      password,
      passwordConfirmation,
      toggleSignUp,
    } = this.state;
    const { err } = this.props;

    return (
      <div className="login-page">
        <section className="login-header">
          <h1 className="konnect-title">{'Let\'s Konnect!'}</h1>
          <div className="login-btns">
            <button
              className={`login-btn-${toggleSignUp ? 'on' : 'off'}`}
              onClick={() => this.handleToggleSignUp(true)}
            >
              Sign up
            </button>
            <button
              className={`login-btn-${!toggleSignUp ? 'on' : 'off'}`}
              onClick={() => this.handleToggleSignUp(false)}
            >
              Log in
            </button>
          </div>
        </section>
        <Form
          handleAvatar={this.handleAvatar}
          err={err}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          password={password}
          passwordConfirmation={passwordConfirmation}
          toggleSignUp={toggleSignUp}
          username={username}
          handleGuest={this.handleGuest}
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
  removeErrorMessage: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  logInUser,
  removeErrorMessage,
  signUpUser,
})(LogIn);
