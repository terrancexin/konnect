import axios from 'axios';
import { initSocket, socket } from './socket';
import {
  LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT,
  USER_CONNECTED,
  rootUrl,
} from '../../constants';

const loginFailed = (error, dispatch) => {
  dispatch({
    type: LOGIN_ERROR,
    payload: error,
  });
};

const loginSuccess = ({ token, newUser, missedMsg }, dispatch) => {
  localStorage.setItem('token', token);
  initSocket(dispatch);
  dispatch({
    type: LOGGED_IN,
    payload: {
      user: newUser,
      missedMsg,
    },
  });
  socket.emit(USER_CONNECTED, newUser);
};

export const logInUser = ({ username, password }) => (dispatch) => {
  axios
    .post(`${rootUrl()}/login`, { username, password })
    .then(({ data }) => {
      if (data.error) {
        loginFailed(data.error, dispatch);
      } else {
        loginSuccess(data, dispatch);
      }
    })
    .catch(() => {
      dispatch({
        type: LOGIN_ERROR,
        payload: 'log in failed, bad login info.',
      });
    });
};

export const signUpUser = ({
  avatar,
  username,
  password,
  passwordConfirmation,
}) => (dispatch) => {
  if (!avatar) {
    avatar = 'default';
  }

  axios
    .post(`${rootUrl()}/signup`, {
      avatar,
      username,
      password,
      passwordConfirmation,
    })
    .then(({ data }) => {
      if (data.error) {
        loginFailed(data.error, dispatch);
      } else {
        loginSuccess(data, dispatch);
      }
    })
    .catch(() => {
      dispatch({
        type: LOGIN_ERROR,
        payload: 'sign up failed, bad login info.',
      });
    });
};

export const logOutUser = user => (dispatch) => {
  socket.emit(LOGOUT, user);
  dispatch({
    type: LOGOUT,
  });
  localStorage.removeItem('token');
};

export const removeLoginError = () => (dispatch) => {
  dispatch({
    type: LOGIN_ERROR,
    payload: '',
  });
};
