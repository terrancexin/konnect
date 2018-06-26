import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  handleToggleGiphy,
  isTyping,
  isTypingPrivate,
  sendMessage,
  setImgSrc,
  setFileName,
  sendPrivateMessage,
} from '../../actions';
import { handleToggleEmoji } from '../../actions/emoji';

import EmojiPicker from './Emoji';
import Giphy from './Giphy';
import ImageUpload from './ImageUpload';
import Typing from './Typing';

class MessageSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      text: '',
      textCount: 0,
    };

    this.addEmoji = this.addEmoji.bind(this);
    this.closeEmojiGiphy = this.closeEmojiGiphy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypingTime = null;
  }

  addEmoji(emoji) {
    this.setState({ text: `${this.state.text}${emoji.native}` });
  }

  closeEmojiGiphy() {
    this.props.handleToggleGiphy(false);
    this.props.handleToggleEmoji(false);
  }

  handleChange(e) {
    const {
      isMatchPrivatePassword,
      user: { username },
    } = this.props;

    const text = e.target.value || '';
    if (!isMatchPrivatePassword) {
      clearTimeout(this.handleTypingTime);
      this.props.isTyping(username, true);
      this.handleTypingTime = setTimeout(() => {
        this.props.isTyping(username, false);
      }, 2000);
    } else {
      clearTimeout(this.handleTypingTime);
      this.props.isTypingPrivate(username, true);
      this.handleTypingTime = setTimeout(() => {
        this.props.isTypingPrivate(username, false);
      }, 2000);
    }

    this.setState({ text, textCount: text.length });
  }

  handleKeyPress(e) {
    const { value } = e.target;

    if (e.key === 'Enter' && value) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ text: '', textCount: 0, date: new Date() });
    const { text, date } = this.state;
    const {
      imgSrc,
      isMatchPrivatePassword,
      user: { username, avatar },
    } = this.props;

    this.props.handleToggleGiphy(false);
    this.props.handleToggleEmoji(false);

    if (!isMatchPrivatePassword) {
      this.props.sendMessage({
        userAvatar: avatar,
        username,
        text,
        date,
        imageMsg: imgSrc,
      });
    } else {
      this.props.sendPrivateMessage({
        userAvatar: avatar,
        username,
        text,
        date,
        imageMsg: imgSrc,
      });
    }


    this.props.setImgSrc('');
    this.props.setFileName('');

    // clears file input event listener
    document.getElementById('imageUploadInput').value = '';
  }

  render() {
    const { text, textCount } = this.state;
    const {
      typing,
      typingPrivate,
      typingUsers,
      typingUsersPrivate,
      verbs,
      imgSrc,
      isMatchPrivatePassword,
      isLocked,
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        {isMatchPrivatePassword && !isLocked && (
          <Typing typing={typingPrivate} typingUsers={typingUsersPrivate} verbs={verbs} />
        )}
        {!isMatchPrivatePassword && (
          <Typing typing={typing} typingUsers={typingUsers} verbs={verbs} />
        )}
        <EmojiPicker addEmoji={this.addEmoji} />
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
    );
  }
}

const mapStateToProps = state => ({
  imgSrc: state.imgSrc,
  typing: state.typing,
  typingPrivate: state.typingPrivate,
  typingUsers: state.typingUsers,
  typingUsersPrivate: state.typingUsersPrivate,
  user: state.user,
  verbs: state.verbs,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
  isLocked: state.isLocked,
});

MessageSubmit.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  typing: PropTypes.bool.isRequired,
  typingPrivate: PropTypes.bool.isRequired,
  typingUsers: PropTypes.array.isRequired,
  typingUsersPrivate: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  verbs: PropTypes.string.isRequired,
  handleToggleEmoji: PropTypes.func.isRequired,
  handleToggleGiphy: PropTypes.func.isRequired,
  isTyping: PropTypes.func.isRequired,
  isTypingPrivate: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setImgSrc: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
  sendPrivateMessage: PropTypes.func.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  handleToggleEmoji,
  handleToggleGiphy,
  isTyping,
  isTypingPrivate,
  sendMessage,
  setImgSrc,
  setFileName,
  sendPrivateMessage,
})(MessageSubmit);
