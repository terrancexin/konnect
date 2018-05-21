import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../public/styles/index.scss';
import store from './store';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
