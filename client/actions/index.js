import axios from 'axios';
import io from 'socket.io-client';
import {
  CLEAR_MISSED_MSG,
  CLEAR_NOTICES,
  GET_MESSAGES,
  GET_MESSAGES_PRIVATE,
  GIPHY,
  LOADING,
  LOGIN_ERROR,
  LOGGED_IN,
  LOGOUT,
  MESSAGE_SENT,
  MESSAGE_SENT_PRIVATE,
  RECEIVE_GIPHY,
  STOPPED_TYPING,
  STOPPED_TYPING_PRIVATE,
  SOCKET_EVENTS,
  TYPING,
  TYPING_PRIVATE,
  TOGGLE_EMOJI,
  TOGGLE_GIPHY,
  TOGGLE_MISSED_MSG,
  TOGGLE_PRIVATE_PW_INPUT,
  USER_CONNECTED,
  SET_IMAGE_SRC,
  SET_FILE_NAME,
  TOGGLE_LOCK,
  UNLOCK_PRIVATE_PASSWORD,
} from '../../constants';

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000';
const PRIVATE_LOCK = process.env.PRIVATE_LOCK || 'dev';

// Socket actions
const socket = io(ROOT_URL);
const initSocket = (dispatch) => {
  socket.on('connect', () => {
    console.log('welcome to konnect!');
  });

  SOCKET_EVENTS.forEach(type =>
    socket.on(type, (payload) => {
      dispatch({ type, payload });
    }));
};

export const socketOff = () => () => {
  SOCKET_EVENTS.forEach(type => socket.off(type));
};

const loginFailed = (error, dispatch) => {
  dispatch({
    type: LOGIN_ERROR,
    payload: error,
  });
};

// User actions
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
    .post(`${ROOT_URL}/login`, { username, password })
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
    .post(`${ROOT_URL}/signup`, {
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

export const removeErrorMessage = () => (dispatch) => {
  dispatch({
    type: LOGIN_ERROR,
    payload: '',
  });
};

// Message actions
export const getMessages = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });

  axios
    .get(`${ROOT_URL}/messages`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(({ data }) => {
      dispatch({
        type: GET_MESSAGES,
        payload: data,
      });

      setTimeout(() => dispatch({ type: LOADING, payload: false }), 500);
    })
    .catch((err) => {
      console.log(`fetch messages failed: ${err}`);
    });
};

export const sendMessage = ({
  userAvatar,
  username,
  date,
  text,
  imageMsg,
}) => () => {
  axios
    .post(`${ROOT_URL}/send`, { userAvatar, username, date, text, imageMsg })
    .then(({ data }) => {
      socket.emit(MESSAGE_SENT, data);
    })
    .catch((err) => {
      console.log(`send message failed: ${err}`);
    });
};

export const clearMissedMsg = username => (dispatch) => {
  axios
    .post(`${ROOT_URL}/bookmark`, { username })
    .then(({ data }) => {
      if (data.error) {
        console.log(`unable to find the username: ${username} to remove`);
      } else {
        dispatch({
          type: CLEAR_MISSED_MSG,
        });
      }
    })
    .catch((err) => {
      console.log(`remove bookmark failed: ${err}`);
    });
};

export const handleToggleMissedMsg = () => ({
  type: TOGGLE_MISSED_MSG,
});

// Notice actions
export const clearNotices = () => ({
  type: CLEAR_NOTICES,
});

export const isTyping = (username, bool) => () => {
  if (bool) {
    socket.emit(TYPING, username);
  } else {
    socket.emit(STOPPED_TYPING, username);
  }
};

export const isTypingPrivate = (username, bool) => () => {
  if (bool) {
    socket.emit(TYPING_PRIVATE, username);
  } else {
    socket.emit(STOPPED_TYPING_PRIVATE, username);
  }
};

// Emoji actions
export const handleToggleEmoji = bool => ({
  type: TOGGLE_EMOJI,
  payload: bool,
});

// Giphy actions
export const fetchGiphy = search => (dispatch) => {
  let url = `${GIPHY.searchUrl}?api_key=${GIPHY.api_key}&q=yay&limit=${GIPHY.limit}&rating=${GIPHY.rating}`;

  if (search) {
    url = `${
      GIPHY.searchUrl
    }?api_key=${
      GIPHY.api_key
    }&q=${
      search
    }&limit=${
      GIPHY.limit
    }&rating=${
      GIPHY.rating
    }`;
  }

  axios
    .get(url)
    .then(({ data: { data } }) => {
      dispatch({
        type: RECEIVE_GIPHY,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(`fetching giphy failed: ${err}`);
    });
};

export const handleToggleGiphy = bool => ({
  type: TOGGLE_GIPHY,
  payload: bool,
});

// Image upload
export const setImgSrc = imgSrc => ({
  type: SET_IMAGE_SRC,
  payload: imgSrc,
});

export const setFileName = file => ({
  type: SET_FILE_NAME,
  payload: file,
});

// Private message
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

export const getPrivateMessages = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });

  axios
    .get(`${ROOT_URL}/messages_private`, {
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
    .post(`${ROOT_URL}/send_private`, { userAvatar, username, date, text, imageMsg })
    .then(({ data }) => {
      socket.emit(MESSAGE_SENT_PRIVATE, data);
    })
    .catch((err) => {
      console.log(`send message failed: ${err}`);
    });
};
