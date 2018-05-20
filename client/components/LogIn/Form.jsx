import React from 'react';

const Form = ({
  err,
  handleChange,
  handleSubmit,
  password,
  passwordConfirmation,
  toggleLogin,
  username,
}) => {
  return (
    <form autoComplete="off" className="login-form" onSubmit={handleSubmit}>
      <div className="login-error">{err ? err : ''}</div>
      <input
        type="text"
        className="login"
        value={username}
        onChange={handleChange('username')}
        maxLength="16"
        placeholder={'username'}
      />
      <input
        type="password"
        className="login"
        value={password}
        maxLength="16"
        onChange={handleChange('password')}
        placeholder={'password'}
      />
      {toggleLogin === 'signup' && (
        <input
          type="password"
          className="login"
          value={passwordConfirmation}
          maxLength="16"
          onChange={handleChange('passwordConfirmation')}
          placeholder={'password'}
        />)}
      <button onClick={handleSubmit} className="enter">Enter</button>
    </form>
  );
};

export default Form;
