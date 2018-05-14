import React, { Component } from 'react';
import io from 'socket.io-client';

const socketUrl = "http://localhost:3000";

export default class Root extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.initSocket();
  }
  
  initSocket() {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected from react');
    });
  }
  
  render() {
    return (
      <div>
        React
      </div>
    );
  }
}