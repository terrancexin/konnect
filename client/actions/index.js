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
} from '../../constants';
const ROOT_URL = 'http://localhost:3000';
const socket = io(ROOT_URL);

const socketEvents = [
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  MESSAGE_SENT,
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
  socket.emit(USER_CONNECTED, data.newUser);
  dispatch({
    type: LOG_IN_SUCCEED,
    payload: {
      username: data.newUser.username,
      auth: data.auth
    },
  });
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
    dispatch({
      type: USER_DISCONNECTED,
      payload: data
    });
  })
  .catch(err => {
    console.log(`remove user failed: ${err}`);
  });
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

// export const fetchMessage = () => dispatch => {
//   axios.get(ROOT_URL, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//     .then(res => {
//       dispatch({
//         type: FETCH_MESSAGES,
//         payload: res.data.message
//       });
//     });
// };

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
  socket.off(USER_DISCONNECTED)
  socket.off(TYPING)
  socket.off(VERIFY_USER)
  socket.off(FETCH_USERS)
  socket.off(FETCH_MESSAGES)
  socket.off(LOGIN_ERROR)
}