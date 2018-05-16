import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import style from '../public/styles';
import { Provider } from 'react-redux';
import store from './store';
import { AUTH_USER } from '../constants';

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({type: AUTH_USER})
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"));
});

