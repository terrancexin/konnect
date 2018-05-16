import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions';

class Chatroom extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        Chatroom
        <button onClick={this.props.logOutUser}>Log out</button>
      </div>
    )
  }
}

export default connect(
  null,
  { logOutUser }
)(Chatroom);