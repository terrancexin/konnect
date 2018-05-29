import {
  CLEAR_MISSED_MSG,
  CLEAR_NOTICES,
  GET_MESSAGES,
  MESSAGE_SENT,
  LOADING,
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
  loading: false,
  messages: [],
  missedMsg: [],
  notice: '',
  typing: false,
  typingUsers: [],
  username: '',
  user: '',
  users: [],
  verbs: '',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_MISSED_MSG:
      return {
        ...state,
        missedMsg: [],
      };
    case CLEAR_NOTICES:
      return {
        ...state,
        notice: '',
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...payload],
      };
    case MESSAGE_SENT:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGGED_IN:
      return {
        ...state,
        auth: true,
        missedMsg: payload.missedMsg,
        username: payload.user.username,
        user: payload.user,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        err: payload,
      };
    case LOGOUT:
      return {
        ...state,
        auth: false,
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: false,
        typingUsers: state.typingUsers.filter(username => username !== payload),
      };
    case TYPING:
      return {
        ...state,
        typing: true,
        typingUsers: state.typingUsers.includes(payload)
          ? state.typingUsers
          : [...state.typingUsers, payload],
        verbs: state.typingUsers.length > 1 ? 'are' : 'is',
      };
    case USER_CONNECTED:
      return {
        ...state,
        users: payload.users.length <= 1 ? payload.users
          : payload.users.sort((a, b) => b.onlineStatus - a.onlineStatus),
        notice: payload.notice,
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        users: payload.users.length <= 1 ? payload.users
          : payload.users.sort((a, b) => b.onlineStatus - a.onlineStatus),
        notice: payload.notice,
      };
    default:
      return state;
  }
};

export default rootReducer;
