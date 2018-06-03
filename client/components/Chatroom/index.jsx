import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearMissedMsg,
  getMessages,
  isTyping,
  logOutUser,
  sendMessage,
  socketOff,
} from '../../actions';

import Footer from '../Footer';
import MessagesList from './MessagesList';
import NavBtns from './NavBtns';
import Notice from '../Notice';
import UsersList from './UsersList';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      toggleMissedMsg: false,
      text: '',
      textCount: 0,
      username: this.props.username,
      userAvatar: this.props.user.avatar,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMissedMsg = this.handleToggleMissedMsg.bind(this);
    this.handleTypingTime = null;
  }

  componentWillMount() {
    this.props.getMessages();
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

  handleToggleMissedMsg() {
    this.setState({ toggleMissedMsg: !this.state.toggleMissedMsg });
  }

  handleLogOut() {
    const { user } = this.props;

    this.props.logOutUser(user);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ text: '', textCount: 0, date: new Date() });

    const { userAvatar, username, text, date } = this.state;
    this.props.sendMessage({ userAvatar, username, text, date });
  }

  render() {
    const { toggleMissedMsg, text, textCount } = this.state;
    const {
      loading,
      missedMsg,
      messages,
      typing,
      typingUsers,
      username,
      users,
      verbs,
    } = this.props;
    const userPluralCheck = users.length <= 1 ? 'user' : 'users';
    const onlineUsers = users.filter(user => user.onlineStatus).length;

    return (
      <div className="chatroom">
        <section className="chatroom-header">
          <h1 className="chatroom-title">Hi, {username}!</h1>
          <span className="current-users">
            You are connected to {users.length - 1} {userPluralCheck} on Konnect
          </span>
        </section>

        <div className="chat-window">
          <Notice />

          <section className="chat-window-left-section">
            <NavBtns
              clearMissedMsg={this.props.clearMissedMsg}
              handleLogOut={this.handleLogOut}
              handleToggleMissedMsg={this.handleToggleMissedMsg}
              missedMsg={missedMsg}
              toggleMissedMsg={toggleMissedMsg}
              username={username}
            />
            <div className="online-users">{onlineUsers} online</div>
            <UsersList users={users} />
          </section>

          <div className="messages-section">
            {!toggleMissedMsg && (
              <MessagesList
                currentUser={username}
                loading={loading}
                messages={messages}
              />
            )}
            {toggleMissedMsg && (
              <MessagesList
                currentUser={username}
                loading={loading}
                messages={missedMsg}
              />
            )}

            <form onSubmit={this.handleSubmit} className="message-form">
              <div className="is-typing">
                {typing ? `${typingUsers.join(', ')} ${verbs} typing...` : ''}
              </div>
              <div className="message-input-box">
                <input
                  autoComplete="off"
                  id="message"
                  maxLength="500"
                  onChange={this.handleChange}
                  placeholder="enter your message"
                  type="text"
                  value={text}
                />
                <span className="character-count">{`${textCount}/500`}</span>
                <button
                  className="send"
                  disabled={text.length < 1}
                  onClick={this.handleSubmit}
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
  user: state.user,
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
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  verbs: PropTypes.string.isRequired,
  clearMissedMsg: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  isTyping: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  socketOff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  clearMissedMsg,
  getMessages,
  isTyping,
  logOutUser,
  sendMessage,
  socketOff,
})(Chatroom);
