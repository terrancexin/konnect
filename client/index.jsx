import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

document.addEventListener("DOMContentLoaded", () => {
  console.log('dom content loaded');
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});

