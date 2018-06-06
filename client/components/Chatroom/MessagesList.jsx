/* global ROOT_URL */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import { formatTime } from '../../utils';

class MessagesList extends Component {
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.setRef = this.setRef.bind(this);
    this.messagesEnd = null;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setRef(node) {
    this.messagesEnd = node;
  }

  scrollToBottom() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView();
    }
  }

  renderLoading() {
    return (
      <div className="loading">
        <img
          className="loading-spinner"
          src={`${ROOT_URL}/images/fidget-loading-spinner.gif`}
          alt="loading-spinner"
        />
      </div>
    );
  }

  renderMessages(messages, currentUser) {
    return messages.map((msg) => {
      const { date, _id, text, username, userAvatar, imageMsg } = msg;
      const threadType = username === currentUser ? 'current-user' : 'other-user';

      return (
        <li className={`${threadType} message-sent`} key={_id}>
          <div className={`${threadType} timestamp-user-box`}>
            <img
              src={`${ROOT_URL}/images/avatars/${userAvatar}.png`}
              className="avatar-img"
              alt="avatar"
            />
            <span className="thread-username">{username}</span>
            <span className="thread-timestamp">{formatTime(date)}</span>
          </div>
          <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
            {imageMsg && <img src={imageMsg} alt="gif" className={`${threadType} message-img`} />}
            {!imageMsg && <div className={`${threadType} message-text`}>{text}</div>}
          </Linkify>
        </li>
      );
    });
  }

  render() {
    const { messages, currentUser, loading } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (messages.length) {
      return (
        <ul className="messages-list">
          { this.renderMessages(messages, currentUser) }
          <div ref={this.setRef} />
        </ul>
      );
    }

    return <span className="no-new-msg">There are no new messages</span>;
  }
}

MessagesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default MessagesList;
