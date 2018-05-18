import axios from 'axios';
import io from 'socket.io-client';
import {
  USER_CONNECTED,
	USER_DISCONNECTED,
	TYPING,
	STOPPED_TYPING,
  LOGIN_ERROR,
  FETCH_MESSAGES,
  FETCH_USERS,
  MESSAGE_SENT,
  LOG_IN_SUCCEED,
  LOG_IN_FAILED,
  RECEIVE_NOTICES,
  CLEAR_NOTICES
} from '../../constants';

// public root
// const { protocol, hostname, port } = window.location;
// const ROOT_URL = `${protocol}//${hostname}:${port}`;

const ROOT_URL = 'http://localhost:3000';
const socket = io(ROOT_URL);

const socketEvents = [
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  MESSAGE_SENT,
  STOPPED_TYPING
];

const initSocket = dispatch => {
  socket.on('connect', () => {
    console.log('welcome to konnect!');
  });
  
  socketEvents.forEach(type => socket.on(type, payload => {
    dispatch({ type, payload });
  }));
}

const loginSuccess = (data, dispatch) => {
  initSocket(dispatch);
  dispatch({
    type: LOG_IN_SUCCEED,
    payload: {
      username: data.newUser.username,
      auth: data.auth
    },
  });
  socket.emit(USER_CONNECTED, data.newUser);
};

const loginFailed = (error, dispatch) => {
  dispatch({
    type: LOG_IN_FAILED,
    payload: error,
  });
};

export const enterOpenChat = username => dispatch => {
  axios({
    method: 'post',
    url: `${ROOT_URL}/openchat`,
    data: { username }
  })
  .then(({ data}) => {
    if (data.error) {
      loginFailed(data.error, dispatch);
    } else {
      loginSuccess(data, dispatch);
    }
  })
  .catch(err => {
    console.log(`open chat login failed: ${err}`);
  });
}

export const fetchUsers = () => dispatch => {
  axios({
    method: 'get',
    url: `${ROOT_URL}/users`
  })
  .then(({ data }) => {
    dispatch({
      type: FETCH_USERS,
      payload: data
    });
  })
  .catch(err => {
    debugger
    console.log(`fetching all users failed: ${err}`);
  });
};

export const fetchMessages = () => dispatch => {
  axios({
    method: 'get',
    url: `${ROOT_URL}/messages`
  })
  .then(({ data }) => {
    dispatch({
      type: FETCH_MESSAGES,
      payload: data
    })
  })
  .catch(err => {
    debugger
    console.log(`fetch messages failed: ${err}`);
  });
}

export const sendMessage = ({ username, date, text }) => dispatch => {
  axios({
    method: 'post',
    url: `${ROOT_URL}/send`,
    data: {
      username,
      date,
      text
    }
  })
  .then(({ data }) => {
    if (data.error) {
      console.log(`send message failed: ${data.error}`);
    } else {
      socket.emit(MESSAGE_SENT, data);
    }
  })
  .catch(err => {
    console.log(`send message failed: ${err}`);
  });
}

export const disconnectSocket = (username) => {
  socket.emit('disconnect', username);
  socket.disconnect();
};

const removeUser = username => dispatch => {
  disconnectSocket(username)
  axios({
    method: 'post',
    url: `${ROOT_URL}/removeuser`,
    data: { username }
  })
  .then(({ data }) => {
    socket.emit(LOGOUT, data);
  })
  .catch(err => {
    console.log(`remove user failed: ${err}`);
  });
}

export const isTyping = (username, bool) => dispatch => {
  if (bool) {
    socket.emit(TYPING, username)
  } else {
    socket.emit(STOPPED_TYPING, username);
  }
}

export const logInUser = ({ username, password }) => dispatch => {
  axios.post(`${ROOT_URL}/login`, { username, password })
    .then(res => {

      dispatch({ type: AUTH_USER });
    })
    .catch(() => {
      dispatch(authError('bad login info'));
    });
};

export const logOutUser = () => dispatch => {
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

export const removeErrorMessage = () => dispatch => {
  dispatch({
    type: LOGIN_ERROR,
    payload: ''
  });
}

export const verifyUser = username => dispatch => {
  socket.emit(VERIFY_USER, username);
}

export const socketOff = () => {
  debugger
  console.log('socketoff');
  socket.off(USER_DISCONNECTED)
  socket.off(TYPING)
  socket.off(MESSAGE_SENT)
  socket.off(USER_CONNECTED)
}

export const clearNotices = () => ({
  type: CLEAR_NOTICES
});