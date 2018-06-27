import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unlockPrivateMessage } from '../actions/private';

import Chatroom from './Chatroom';
import LogIn from './LogIn';

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

