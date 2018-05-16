import React, { Component } from 'react';
import { connect } from 'react-redux';
import WelcomeForm from './WelcomeForm';
import Chatroom from './Chatroom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.authenticated ? <Chatroom /> : <WelcomeForm /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps, null)(App);
