import { sortOnlineStatus } from '../utils';
import {
  CLEAR_MISSED_MSG,
  CLEAR_NOTICES,
  GET_MESSAGES,
  GET_MESSAGES_PRIVATE,
  MESSAGE_SENT,
  MESSAGE_SENT_PRIVATE,
  LOADING,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT,
  RECEIVE_GIPHY,
  STOPPED_TYPING,
  TOGGLE_GIPHY,
  TOGGLE_EMOJI,
  TOGGLE_MISSED_MSG,
  TOGGLE_PRIVATE_PW_INPUT,
  TYPING,
  USER_CONNECTED,
  USER_DISCONNECTED,
  SET_IMAGE_SRC,
  SET_FILE_NAME,
  TOGGLE_LOCK,
  UNLOCK_PRIVATE_PASSWORD,
} from '../../constants';

const initialState = {
  auth: false,
  imgSrc: '',
  imgFileName: '',
  toggleEmoji: false,
  err: '',
  giphy: [],
  loading: false,
  messages: [],
  messagesPrivate: [],
  missedMsg: [],
  toggleMissedMsg: false,
  notice: '',
  toggleGiphy: false,
  isLocked: true,
  typing: false,
  typingUsers: [],
  username: '',
  user: null,
  users: [],
  verbs: '',
  isMatchPrivatePassword: false,
  privatePasswordInput: false,
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
    case GET_MESSAGES_PRIVATE:
      return {
        ...state,
        messagesPrivate: [...payload],
      };
    case MESSAGE_SENT:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case MESSAGE_SENT_PRIVATE:
      return {
        ...state,
        messagesPrivate: [...state.messages, payload],
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
    case RECEIVE_GIPHY:
      return {
        ...state,
        giphy: payload,
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: false,
        typingUsers: state.typingUsers.filter(username => username !== payload),
      };
    case TOGGLE_GIPHY:
      return {
        ...state,
        toggleGiphy: payload,
      };
    case TOGGLE_EMOJI:
      return {
        ...state,
        toggleEmoji: payload,
      };
    case TOGGLE_MISSED_MSG:
      return {
        ...state,
        toggleMissedMsg: !state.toggleMissedMsg,
      };
    case TOGGLE_LOCK:
      return {
        ...state,
        isLocked: payload,
      };
    case TOGGLE_PRIVATE_PW_INPUT:
      return {
        ...state,
        privatePasswordInput: payload,
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
        notice: payload.notice,
        users: payload.users.length <= 1 ? payload.users : sortOnlineStatus(payload.users),
      };
    case USER_DISCONNECTED:
      return {
        ...state,
        notice: payload.notice,
        users: payload.users.length <= 1 ? payload.users : sortOnlineStatus(payload.users),
      };
    case SET_IMAGE_SRC:
      return {
        ...state,
        imgSrc: payload,
      };
    case SET_FILE_NAME:
      return {
        ...state,
        imgFileName: payload,
      };
    case UNLOCK_PRIVATE_PASSWORD:
      return {
        ...state,
        isMatchPrivatePassword: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
