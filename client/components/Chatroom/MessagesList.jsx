import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import moment from 'moment';

class MessagesList extends Component {
  constructor(props) {
    super(props);

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
    });
  }

  render() {
    const { messages, currentUser, loading } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (messages.length) {
      return (
        <div className="messages-list">
          { this.renderMessages(messages, currentUser) }
          <div ref={el => (this.messagesEnd = el)} />
        </div>
      );
    }

    return <div className="no-new-msg">There are no new messages</div>;
  }
}

MessagesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default MessagesList;
