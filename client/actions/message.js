import axios from 'axios';
import { socket } from './socket';
import {
  CLEAR_MISSED_MSG,
  GET_MESSAGES,
  LOADING,
  MESSAGE_SENT,
  TOGGLE_MISSED_MSG,
  rootUrl,
} from '../../constants';

export const getMessages = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });

  axios
    .get(`${rootUrl()}/messages`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(({ data }) => {
      dispatch({
        type: GET_MESSAGES,
        payload: data,
      });

      setTimeout(() => dispatch({ type: LOADING, payload: false }), 500);
    })
    .catch((err) => {
      console.log(`fetch messages failed: ${err}`);
    });
};

export const sendMessage = ({
  userAvatar,
  username,
  date,
  text,
  imageMsg,
}) => () => {
  axios
    .post(`${rootUrl()}/send`, { userAvatar, username, date, text, imageMsg })
    .then(({ data }) => {
      socket.emit(MESSAGE_SENT, data);
    })
    .catch((err) => {
      console.log(`send message failed: ${err}`);
    });
};

export const clearMissedMsg = username => (dispatch) => {
  axios
    .post(`${rootUrl()}/bookmark`, { username })
    .then(({ data }) => {
      if (data.error) {
        console.log(`unable to find the username: ${username} to remove`);
      } else {
        dispatch({
          type: CLEAR_MISSED_MSG,
        });
      }
    })
    .catch((err) => {
      console.log(`remove bookmark failed: ${err}`);
    });
};

export const handleToggleMissedMsg = () => ({
  type: TOGGLE_MISSED_MSG,
});
