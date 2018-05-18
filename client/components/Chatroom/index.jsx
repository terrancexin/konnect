import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  socketOff,
  fetchMessages,
  fetchUsers,
  sendMessage,
  isTyping
} from '../../actions';
import UsersList from './UsersList';
import MessagesList from './MessagesList';

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
    this.handleTypingTime = null;
  }
  
  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUsers();
  }

  // componentWillUnmount() {
  //   this.props.socketOff();
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ date: new Date() });
    const { username, text, date } = this.state;
    this.props.sendMessage({ username, text, date });
    this.setState({ text: '' });
  }

  handleChange(e) {
    clearTimeout(this.handleTypingTime);
    this.props.isTyping(this.props.username, true);
    this.handleTypingTime = setTimeout(() => {
      this.props.isTyping(this.props.username, false);
    }, 2000);
        
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="chatroom-wrapper">
        <div className="chatroom-header-section">
          <h1 className="chatroom-header-title">
            Hi, {this.props.username}!
          </h1>
          <div className="chatroom-current-users">
            You are connected to {this.props.users.length} users on Konnect
          </div>
        </div>
        <div className="chat-window">
          <div className="users-section">
            <UsersList users={this.props.users} />
          </div>
          <div className="messages-section">
            <MessagesList currentUser={this.props.username} messages={this.props.messages} />
            
            <form onSubmit={this.handleSubmit} className="message-form">
              <div className="display-typing">
                { this.props.typing ? `${this.props.typingUsers.join(', ')} ${this.props.verbs} typing...` : ''}
              </div>
              <div className="message-input-button-wrapper">
                <input
                  id="message"
                  type="text"
                  value={this.state.text}
                  autoComplete="off"
                  placeholder="enter your message"
                  onChange={this.handleChange}
                />
                <button 
                  disabled={this.state.text.length < 1}
                  type="submit"
                  className="send">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    users: state.users,
    messages: state.messages,
    hasMoreMessages: state.hasMoreMessages,
    typing: state.typing,
    typingUsers: state.typingUsers,
    verbs: state.verbs
  };
};

export default connect(mapStateToProps, {
  socketOff,
  fetchMessages,
  fetchUsers,
  sendMessage,
  isTyping
})(Chatroom);
