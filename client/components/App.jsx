import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogIn from './LogIn';
import Chatroom from './Chatroom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        {this.props.auth ? <Chatroom /> : <LogIn />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({ auth: state.auth })
};

export default connect(
  mapStateToProps,
  null
)(App);
