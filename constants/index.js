module.exports = {
  CLEAR_MISSED_MSG: 'CLEAR_MISSED_MSG',
  CLEAR_NOTICES: 'CLEAR_NOTICES',
  GET_MESSAGES: 'GET_MESSAGES',
  GET_MESSAGES_PRIVATE: 'GET_MESSAGES_PRIVATE',
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_SENT_PRIVATE: 'MESSAGE_SENT_PRIVATE',
  LOADING: 'LOADING',
  LOGGED_IN: 'LOGGED_IN',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  RECEIVE_GIPHY: 'RECEIVE_GIPHY',
  SET_FILE_NAME: 'SET_FILE_NAME',
  SET_IMAGE_SRC: 'SET_IMAGE_SRC',
  STOPPED_TYPING: 'STOPPED_TYPING',
  STOPPED_TYPING_PRIVATE: 'STOPPED_TYPING_PRIVATE',
  TYPING: 'TYPING',
  TYPING_PRIVATE: 'TYPING_PRIVATE',
  TOGGLE_GIPHY: 'TOGGLE_GIPHY',
  TOGGLE_EMOJI: 'TOGGLE_EMOJI',
  TOGGLE_LOCK: 'TOGGLE_LOCK',
  TOGGLE_MIC: 'TOGGLE_MIC',
  TOGGLE_MISSED_MSG: 'TOGGLE_MISSED_MSG',
  TOGGLE_PRIVATE_PW_INPUT: 'TOGGLE_PRIVATE_PW_INPUT',
  UNLOCK_PRIVATE_PASSWORD: 'UNLOCK_PRIVATE_PASSWORD',
  SOCKET_EVENTS: [
    'MESSAGE_SENT',
    'MESSAGE_SENT_PRIVATE',
    'STOPPED_TYPING',
    'STOPPED_TYPING_PRIVATE',
    'TYPING',
    'TYPING_PRIVATE',
    'USER_CONNECTED',
    'USER_DISCONNECTED',
  ],
  USER_CONNECTED: 'USER_CONNECTED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  GIPHY: {
    searchUrl: 'https://api.giphy.com/v1/gifs/search',
    api_key: 'dc6zaTOxFJmzC',
    limit: 6,
    offset: 0,
    rating: 'G',
  },
  PING_PONG: 'PING_PONG',
  rootUrl: () => process.env.ROOT_URL || 'http://localhost:3000',
};

