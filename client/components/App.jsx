import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { unlockPrivateMessage } from '../actions';

import LogIn from './LogIn';
import Chatroom from './Chatroom';

window.ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000';

class App extends Component {
  componentDidMount() {
    this.props.unlockPrivateMessage(false);
  }

  render() {
    return (
      <div className="app">
        {this.props.auth ? <Chatroom /> : <LogIn />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  unlockPrivateMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  unlockPrivateMessage,
})(App);

