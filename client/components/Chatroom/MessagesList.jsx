import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import moment from 'moment';

class MessagesList extends Component {
  constructor() {
    super();

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.messagesEnd = null;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  render() {
    const { messages, currentUser, loading } = this.props;

    if (loading) {
      return (
        <div className="loading">
          <img
            className="loading-spinner"
            src={`${ROOT_URL}/images/fidget-loading-spinner.gif`}
            alt="loading-spinner"
          />
          <div ref={el => this.messagesEnd = el} />
        </div>
      );
    }

    if (messages.length === 0) {
      return (
        <div className="no-new-msg">
          There are no new messages
          <div ref={el => (this.messagesEnd = el)} />
        </div>
      );
    }
    return (
      <div className="messages-list">
        {messages.map((msg) => {
          const { date, _id, text, username } = msg;
          const threadType = username === currentUser ? 'current-user' : 'other-user';

          return (
            <div className={`${threadType} message-input `} key={_id}>
              <div className={`${threadType} timestamp-user-row`}>
                <div className="thread-username">{username}</div>
                <div className="thread-timestamp">{moment(date).format('h:mm a')}</div>
              </div>
              <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
                <div className={`${threadType} message-text`}>{text}</div>
              </Linkify>
            </div>
          );
        })}
        <div ref={el => (this.messagesEnd = el)} />
      </div>
    );
  }
}

MessagesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default MessagesList;
