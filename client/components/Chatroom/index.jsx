import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearMissedMsg,
  fetchMessages,
  fetchUsers,
  isTyping,
  sendMessage,
  signOutUser,
  socketOff,
} from '../../actions';

import Footer from '../Footer';
import MessagesList from './MessagesList';
import MissedMessages from './MissedMessages';
import Notice from '../Notice';
import UsersList from './UsersList';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      missed: false,
      text: '',
      textCount: 0,
      username: this.props.username,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.toggleMissed = this.toggleMissed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypingTime = null;
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUsers();
  }

  componentWillUnmount() {
    this.props.socketOff();
  }

  handleChange(e) {
    const { username } = this.props;
    const text = e.target.value || '';

    clearTimeout(this.handleTypingTime);
    this.props.isTyping(username, true);
    this.handleTypingTime = setTimeout(() => {
      this.props.isTyping(username, false);
    }, 2000);

    this.setState({ text, textCount: text.length });
  }

  toggleMissed() {
    this.setState({ missed: !this.state.missed });
  }

  handleLogOut() {
    const { username } = this.props;

    this.props.signOutUser(username);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ text: '', textCount: 0, date: new Date() });

    const { username, text, date } = this.state;
    this.props.sendMessage({ username, text, date });
  }

  render() {
    const { missed, text, textCount } = this.state;
    const {
      username,
      users,
      missedMsg,
      messages,
      loading,
      typing,
      typingUsers,
      verbs,
    } = this.props;
    const userCount = users.length <= 1 ? 'user' : 'users';
    const onlineUsers = users.filter(user => user.onlineStatus).length;

    return (
      <div className="chatroom">
        <section className="chatroom-header">
          <h1 className="chatroom-title">Hi, {username}!</h1>
          <div className="current-users">
            You are connected to {users.length - 1} {userCount} on Konnect
          </div>
        </section>
        <div className="chat-window">
          <Notice />
          <section className="chat-left-bar">
            <MissedMessages
              handleLogOut={this.handleLogOut}
              missed={missed}
              missedMsg={missedMsg}
              toggleMissed={this.toggleMissed}
              clearMissedMsg={this.props.clearMissedMsg}
              username={username}
            />
            <div className="online-users">{onlineUsers} online</div>
            <UsersList users={users} />
          </section>
          <div className="messages-section">
            {!missed && <MessagesList
              currentUser={username}
              messages={messages}
              loading={loading}
            />}
            {missed && <MessagesList
              currentUser={username}
              messages={missedMsg}
              loading={loading}
            />}

            <form onSubmit={this.handleSubmit} className="message-form">
              <div className="display-typing">
                {typing
                  ? `${typingUsers.join(', ')} ${
                      verbs
                    } typing...`
                  : ''}
              </div>
              <div className="message-input-button-wrapper">
                <input
                  id="message"
                  type="text"
                  value={text}
                  autoComplete="off"
                  placeholder="enter your message"
                  maxLength="45"
                  onChange={this.handleChange}
                />
                <p className="text-character-count">{`${textCount}/45`}</p>
                <button
                  disabled={text.length < 1}
                  onClick={this.handleSubmit}
                  className="send"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  messages: state.messages,
  missedMsg: state.missedMsg,
  typing: state.typing,
  typingUsers: state.typingUsers,
  username: state.username,
  users: state.users,
  verbs: state.verbs,
});

Chatroom.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  missedMsg: PropTypes.array.isRequired,
  typing: PropTypes.bool.isRequired,
  typingUsers: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  verbs: PropTypes.string.isRequired,
  clearMissedMsg: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  isTyping: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired,
  socketOff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  clearMissedMsg,
  fetchMessages,
  fetchUsers,
  isTyping,
  sendMessage,
  signOutUser,
  socketOff,
})(Chatroom);
