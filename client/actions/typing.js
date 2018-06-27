import { socket } from './socket';
import {
  STOPPED_TYPING,
  TYPING,
} from '../../constants';

const isTyping = (username, bool) => () => {
  if (bool) {
    socket.emit(TYPING, username);
  } else {
    socket.emit(STOPPED_TYPING, username);
  }
};

module.exports = {
  isTyping,
};
