import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  socketOff,
  fetchMessages,
  fetchUsers,
  sendMessage
} from '../../actions';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: this.props.username,
      date: new Date()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUsers();
  }

  componentWillUnMount() {
    sthis.props.socketOff();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, text, date } = this.state;
    this.props.sendMessage({ username, text, date });
    this.setState({ text: '' });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <div>Current User: {this.props.username}</div>
        <div className="chat-window">
          <div className="messages-screen">
            {this.props.messages.map(obj => {
              return <div key={obj._id}>{obj.text}</div>;
            })}
          </div>
          <div className="users-screen">
            {this.props.users.map(obj => {
              return <div key={obj._id}>{obj.username}</div>;
            })}
          </div>
          <div />
          </div>
        <form onSubmit={this.handleSubmit} className="message-form">
          <label>
            <textarea value={this.state.text} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    err: state.err,
    user: state.user,
    username: state.username,
    users: state.users,
    messages: state.messages,
    hasMoreMessages: state.hasMoreMessages
  };
};

export default connect(mapStateToProps, {
  socketOff,
  fetchMessages,
  fetchUsers,
  sendMessage
})(Chatroom);
