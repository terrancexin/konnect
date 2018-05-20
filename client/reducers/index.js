import {
  CLEAR_NOTICES,
  FETCH_MESSAGES,
  FETCH_USERS,
  MESSAGE_SENT,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT,
  STOPPED_TYPING,
  TYPING,
  USER_CONNECTED,
  USER_DISCONNECTED,
} from '../../constants';

const initialState = {
  auth: false,
  err: '',
  hasMoreMessages: true,
  messages: [],
  notice: '',
  typing: false,
  typingUsers: [],
  username: '',
  users: [],
  verbs: '',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_NOTICES:
      return {
        ...state,
        notice: ''
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: [ ...payload ]
      };
    case FETCH_USERS:
      return {
        ...state,
        users: [ ...payload ]
      };
    case MESSAGE_SENT:
      return {
        ...state,
        messages: [ ...state.messages, payload ]
      };
    case LOGGED_IN:
      return {
        ...state,
        username: payload.username,
        auth: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        err: payload
      };
    case LOGOUT:
      return {
        ...state,
        auth: false
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: false,
        typingUsers: state.typingUsers.filter(username => username != payload),
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
    case USER_CONNECTED:
      return {
        ...state,
        users: [ ...state.users, payload.user ],
        notice: payload.notice
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        users: state.users.filter(user => user.username != payload.username),
        notice: payload.notice
      };
    default:
      return state;
  }
};

export default rootReducer;
