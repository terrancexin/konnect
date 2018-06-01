const validateInputInfo = (username, password, passwordConfirmation) => {
  if (!username) {
    return 'hey, enter something!';
  }

  if (username === 'username') {
    return 'c\'mon, be more creative than that!';
  }

  if (username.length > 15 || password.length > 15) {
    return '15 characters max for all inputs';
  }

  if (!password) {
    return 'password can\'t be blank';
  }

  if (!passwordConfirmation) {
    return 'please confirm your password';
  }

  if (password !== passwordConfirmation) {
    return 'passwords do not match';
  }
};

module.exports = {
  validateInputInfo,
};
