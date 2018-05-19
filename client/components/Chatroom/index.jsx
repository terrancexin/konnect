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
import Notice from '../Notice';
import PrivateChat from './PrivateChat';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: this.props.username,
      date: new Date(),
      textCount: 0,
      privateMsg: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.togglePrivateMsg = this.togglePrivateMsg.bind(this);
    
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
    this.setState({ text: '', textCount: 0, date: new Date() });
    const { username, text, date } = this.state;
    this.props.sendMessage({ username, text, date });
  }
  
  togglePrivateMsg() {
    this.state.privateMsg
      ? this.setState({ privateMsg: false })
      : this.setState({ privateMsg: true })
  }
  
  handleChange(e) {
// const value = e.target.value || ''
    clearTimeout(this.handleTypingTime);
    this.props.isTyping(this.props.username, true);
    this.handleTypingTime = setTimeout(() => {
      this.props.isTyping(this.props.username, false);
    }, 2000);
        
    this.setState({ text: e.target.value, textCount: e.target.value.length });
  }

  render() {
    const userCount = this.props.users.length <= 1 ? 'user' : 'users';
    return (
      <div className="chatroom-wrapper">
        <div className="chatroom-header-section">
          <h1 className="chatroom-header-title">
            Hi, {this.props.username}!
          </h1>
          <div className="chatroom-current-users">
            You are connected to {this.props.users.length - 1} {userCount} on Konnect
          </div>
        </div>
        <Notice />
        <div className="chat-window">
          <div className="users-section">
            <UsersList users={this.props.users} />
            <div className="private-chat-btn-wrapper">
              <button onClick={this.togglePrivateMsg} className="private-message-btn">
                {this.state.privateMsg ? 'General Chat' : 'Private Message'}
              </button>
            </div>
          </div>
          { this.state.privateMsg && <PrivateChat />}
          {!this.state.privateMsg && <div className="messages-section">
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
                  maxLength="45"
                  onChange={this.handleChange}
                />
                <label className="text-character-count">
                  {`${this.state.textCount}/45`}
                </label>
                <button 
                  disabled={this.state.text.length < 1}
                  onClick={this.handleSubmit}
                  className="send">
                  Send
                </button>
              </div>
            </form>
          </div>}
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
