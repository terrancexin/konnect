import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearMissedMsg,
  fetchGiphy,
  getMessages,
  handleToggleEmoji,
  handleToggleGiphy,
  isTyping,
  logOutUser,
  sendMessage,
  socketOff,
  setImgSrc,
  setFileName,
} from '../../actions';

import Emoji from './Emoji';
import Footer from '../Footer';
import Giphy from './Giphy';
import ImageUpload from './ImageUpload';
import MessagesList from './MessagesList';
import NavBtns from './NavBtns';
import Notice from '../Notice';
import Typing from './Typing';
import UsersList from './UsersList';
import PrivateLockBtn from './PrivateLockBtn';
import PrivateChat from './PrivateChat';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      toggleMissedMsg: false,
      text: '',
      textCount: 0,
    };

    this.addEmoji = this.addEmoji.bind(this);
    this.closeEmojiGiphy = this.closeEmojiGiphy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMissedMsg = this.handleToggleMissedMsg.bind(this);
    this.handleTypingTime = null;
  }

  componentDidMount() {
    this.props.getMessages();
    this.props.fetchGiphy();
  }

  componentWillUnmount() {
    this.props.socketOff();
  }

  addEmoji(emoji) {
    this.setState({ text: `${this.state.text}${emoji.native}` });
  }

  closeEmojiGiphy() {
    this.props.handleToggleGiphy(false);
    this.props.handleToggleEmoji(false);
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

  handleKeyPress(e) {
    const { value } = e.target;

    if (e.key === 'Enter' && value) {
      this.handleSubmit(e);
    }
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
    const { text, date } = this.state;
    const { imgSrc, user: { username, avatar } } = this.props;

    this.props.handleToggleGiphy(false);
    this.props.handleToggleEmoji(false);
    this.props.sendMessage({
      userAvatar: avatar,
      username,
      text,
      date,
      imageMsg: imgSrc,
    });

    this.props.setImgSrc('');
    this.props.setFileName('');

    // clears file input event listener
    document.getElementById('imageUploadInput').value = '';
  }

  render() {
    const { text, textCount, toggleMissedMsg } = this.state;
    const {
      loading,
      missedMsg,
      messages,
      typing,
      typingUsers,
      username,
      users,
      verbs,
      imgSrc,
      isMatchPrivatePassword,
      isLocked,
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

        {isMatchPrivatePassword && !isLocked && <PrivateChat />}
        {!isMatchPrivatePassword && (
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
                <Typing typing={typing} typingUsers={typingUsers} verbs={verbs} />
                <Emoji addEmoji={this.addEmoji} />
                <Giphy />
                <ImageUpload />
                <div className="message-input-box">
                  <input
                    autoComplete="off"
                    id="message"
                    maxLength="500"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    onClick={this.closeEmojiGiphy}
                    placeholder="enter your message"
                    type="text"
                    value={text}
                  />
                  <span className="character-count">{`${textCount}/500`}</span>
                  <button
                    className="send"
                    disabled={text.length < 1 && !imgSrc}
                    onClick={this.handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <PrivateLockBtn />
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
  imgSrc: state.imgSrc,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
  isLocked: state.isLocked,
});

Chatroom.propTypes = {
  fetchGiphy: PropTypes.func.isRequired,
  handleToggleEmoji: PropTypes.func.isRequired,
  handleToggleGiphy: PropTypes.func.isRequired,
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
  setImgSrc: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  clearMissedMsg,
  fetchGiphy,
  handleToggleEmoji,
  handleToggleGiphy,
  getMessages,
  isTyping,
  logOutUser,
  sendMessage,
  socketOff,
  setImgSrc,
  setFileName,
})(Chatroom);
