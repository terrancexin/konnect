import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const Form = ({
  err,
  handleAvatar,
  handleChange,
  handleGuest,
  handleSubmit,
  password,
  passwordConfirmation,
  toggleSignUp,
  username,
}) => (
  <form autoComplete="off" className="login__form" onSubmit={handleSubmit}>
    <span className="login__error">{err || ''}</span>
    <input
      type="text"
      className="login__input"
      value={username}
      onChange={handleChange('username')}
      maxLength="16"
      placeholder="username"
    />
    <input
      type="password"
      className="login__input"
      value={password}
      maxLength="16"
      onChange={handleChange('password')}
      placeholder="password"
    />
    {toggleSignUp && (
      <input
        type="password"
        className="login__input"
        value={passwordConfirmation}
        maxLength="16"
        onChange={handleChange('passwordConfirmation')}
        placeholder="confirm again"
      />
    )}
    {toggleSignUp && <p className="pick-avatar">Pick an avatar</p>}
    {toggleSignUp && <Avatar handleAvatar={handleAvatar} />}
    <button onClick={handleSubmit} className="login__btns--enter">Enter</button>
    <button onClick={handleGuest} className="login__btns--guest">Guest Demo</button>
  </form>
);

Form.propTypes = {
  err: PropTypes.string.isRequired,
  handleAvatar: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleGuest: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  toggleSignUp: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default Form;
