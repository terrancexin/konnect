import {
  USER_DISCONNECTED,
  TYPING,
  VERIFY_USER,
  FETCH_USERS,
  FETCH_MESSAGES,
  LOGIN_ERROR,
  LOG_IN_FAILED,
  LOG_IN_SUCCEED,
  MESSAGE_SENT,
  USER_CONNECTED
} from '../../constants';

const initialState = {
  err: '',
  auth: false,
  username: '',
  users: [],
  typing: false,
  messages: [],
  hasMoreMessages: true,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN_SUCCEED:
      return {
        ...state,
        username: payload.username,
        auth: payload.auth,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        err: payload,
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        user: '',
      };
    case TYPING:
      return {
        ...state,
        typing: payload
      };
    case VERIFY_USER:
      return {
        ...state,
        auth: payload.auth,
        user: payload.username
      };
    case FETCH_USERS:
      return {
        ...state,
        users: [ ...payload ]
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: [ ...payload ]
      };
    case LOGIN_ERROR:
      return {
        ...state,
        err: payload
      };
    case MESSAGE_SENT:
      return {
        ...state,
        messages: [ ...state.messages, payload ]
      };
    case USER_CONNECTED:
      return {
        ...state,
        users: [ ...state.users, payload ]
      };
    default:
      return state;
  }
};

export default rootReducer;
