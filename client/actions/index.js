import axios from 'axios';
import {
  UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../../constants';
const ROOT_URL = 'http://localhost:3000';

export const logInUser = ({ username, password }) => dispatch => {
  axios.post(`${ROOT_URL}/signin`, { username, password })
    .then(res => {
      localStorage.setItem('token', res.data.token);

      dispatch({ type: AUTH_USER });
    })
    .catch(() => {
      dispatch(authError('bad login info'));
    });
};

export const logOutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: UNAUTH_USER
  });
};

export const signUpUser = ({
  username,
  password,
  passwordConfirmation
}) => dispatch => {
  axios.post(`${ROOT_URL}/signup`, { username, password, passwordConfirmation })
    .then(res => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', res.data.token);
    })
    .catch(({ res }) => {
      dispatch(authError(res.data.error));
    });
};

export const authError = err => {
  return {
    type: AUTH_ERROR,
    payload: err
  };
};

export const fetchMessage = () => dispatch => {
  axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: res.data.message
      });
    });
};
