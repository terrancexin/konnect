import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchMessages,
  fetchUsers,
  isTyping,
  sendMessage,
  signOutUser,
  socketOff
} from '../../actions';
import MessagesList from './MessagesList';
import Notice from '../Notice';
import UsersList from './UsersList';
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
    this.handleLogOut = this.handleLogOut.bind(this);
    
    this.handleTypingTime = null;
  }
  
  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUsers();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.socketOff();
  }

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
  
  handleLogOut() {
    this.props.signOutUser(this.props.username)
  }
  render() {
    const userCount = this.props.users.length <= 1 ? 'user' : 'users';
    
    return (
      <div className="chatroom">
        <section className="chatroom-header">
          <h1 className="chatroom-title">
            Hi, {this.props.username}!
          </h1>
          <div className="current-users">
            You are connected to {this.props.users.length - 1} {userCount} on Konnect
          </div>
        </section>
        <div className="chat-window">
          <Notice />
          <section className="chat-left-bar">
            <button className="logout" onClick={this.handleLogOut}>logout</button>
            <UsersList users={this.props.users} />
          </section>
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
  isTyping,
  signOutUser
})(Chatroom);
