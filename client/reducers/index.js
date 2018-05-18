import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  STOPPED_TYPING,
  FETCH_USERS,
  FETCH_MESSAGES,
  LOGIN_ERROR,
  LOG_IN_FAILED,
  LOG_IN_SUCCEED,
  MESSAGE_SENT,
  CLEAR_NOTICES,
  RECEIVE_NOTICES
} from '../../constants';

const initialState = {
  err: '',
  auth: false,
  username: '',
  users: [],
  typing: false,
  messages: [],
  hasMoreMessages: true,
  typingUsers: [],
  verbs: '',
  notices: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_NOTICES:
      return {
        ...state,
        notices: [ ...state.notices, payload]
      };
    case CLEAR_NOTICES:
      return {
        ...state,
        notices: []
      };
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
        users: state.users.filter(user => user.username != payload.username),
        username: payload.username
      };
    case TYPING:
      return {
        ...state,
        typing: true,
        typingUsers: state.typingUsers.includes(payload) 
          ? state.typingUsers 
          : [ ...state.typingUsers, payload ],
        verbs: state.typingUsers.length > 1 ? 'are' : 'is'
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: false,
        typingUsers: state.typingUsers.filter(username => username != payload),
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
