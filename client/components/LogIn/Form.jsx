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
  toggleLogin,
  username,
}) => (
  <form autoComplete="off" className="login-form" onSubmit={handleSubmit}>
    <span className="login-error">{err || ''}</span>
    <input
      type="text"
      className="login"
      value={username}
      onChange={handleChange('username')}
      maxLength="16"
      placeholder="username"
    />
    <input
      type="password"
      className="login"
      value={password}
      maxLength="16"
      onChange={handleChange('password')}
      placeholder="password"
    />
    {toggleLogin === 'signup' && (
      <input
        type="password"
        className="login"
        value={passwordConfirmation}
        maxLength="16"
        onChange={handleChange('passwordConfirmation')}
        placeholder="confirm again"
      />
    )}
    {toggleLogin === 'signup' && <p className="pick-avatar">Pick an avatar</p>}
    {toggleLogin === 'signup' && <Avatar handleAvatar={handleAvatar} />}
    <button onClick={handleSubmit} className="enter">Enter</button>
    <button onClick={handleGuest} className="guest">Guest Demo</button>
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
  toggleLogin: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Form;
