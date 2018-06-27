import io from 'socket.io-client';
import { SOCKET_EVENTS, PING_PONG, rootUrl } from '../../constants';

export const socket = io(rootUrl());

export const initSocket = (dispatch) => {
  socket.on('connect', () => {
    console.log('welcome to konnect!');
  });

  setInterval(() => {
    socket.emit(PING_PONG);
  }, 1000);

  SOCKET_EVENTS.forEach(type =>
    socket.on(type, (payload) => {
      dispatch({ type, payload });
    }));
};

export const socketOff = () => () => {
  SOCKET_EVENTS.forEach(type => socket.off(type));
};
