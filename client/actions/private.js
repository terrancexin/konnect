import axios from 'axios';
import { socket } from './socket';
import {
  GET_MESSAGES_PRIVATE,
  LOADING,
  LOGIN_ERROR,
  TOGGLE_LOCK,
  MESSAGE_SENT_PRIVATE,
  STOPPED_TYPING_PRIVATE,
  TOGGLE_PRIVATE_PW_INPUT,
  TYPING_PRIVATE,
  UNLOCK_PRIVATE_PASSWORD,
  rootUrl,
} from '../../constants';

const PRIVATE_LOCK = process.env.PRIVATE_LOCK || 'dev';

export const getPrivateMessages = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });

  axios
    .get(`${rootUrl()}/messages_private`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(({ data }) => {
      dispatch({
        type: GET_MESSAGES_PRIVATE,
        payload: data,
      });

      setTimeout(() => dispatch({ type: LOADING, payload: false }), 500);
    })
    .catch((err) => {
      console.log(`fetch messages failed: ${err}`);
    });
};

export const sendPrivateMessage = ({
  userAvatar,
  username,
  date,
  text,
  imageMsg,
}) => () => {
  axios
    .post(`${rootUrl()}/send_private`, { userAvatar, username, date, text, imageMsg })
    .then(({ data }) => {
      socket.emit(MESSAGE_SENT_PRIVATE, data);
    })
    .catch((err) => {
      console.log(`send message failed: ${err}`);
    });
};

export const toggleLock = bool => ({
  type: TOGGLE_LOCK,
  payload: bool,
});

export const submitPrivatePassword = password => (dispatch) => {
  if (password === PRIVATE_LOCK) {
    dispatch({ type: TOGGLE_LOCK, payload: false });
    dispatch({ type: UNLOCK_PRIVATE_PASSWORD, payload: true });
    dispatch({ type: TOGGLE_PRIVATE_PW_INPUT, payload: false });
  } else {
    dispatch({ type: LOGIN_ERROR, payload: 'incorrect password' });
    dispatch({ type: TOGGLE_LOCK, payload: true });
    dispatch({ type: UNLOCK_PRIVATE_PASSWORD, payload: false });
  }
};

export const handleTogglePrivatePWInput = bool => ({
  type: TOGGLE_PRIVATE_PW_INPUT,
  payload: bool,
});

export const unlockPrivateMessage = bool => ({
  type: UNLOCK_PRIVATE_PASSWORD,
  payload: bool,
});


export const isTypingPrivate = (username, bool) => () => {
  if (bool) {
    socket.emit(TYPING_PRIVATE, username);
  } else {
    socket.emit(STOPPED_TYPING_PRIVATE, username);
  }
};
