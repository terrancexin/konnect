import React, { Component } from 'react';
import moment from 'moment';

class MessagesList extends Component {
  constructor(props) {
    super(props);
    
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.messagesEnd = null;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages, currentUser } = this.props;
    return (
      <div className="messages-list-wrapper">
        {messages.map(msg => {
          let threadType =
            msg.username === currentUser ? 'current-user' : 'other-user';
          return (
            <div className={`message-thread-${threadType}`} key={msg._id}>
              <div className="message-thread-username">{msg.username}</div>
              <div className={`message-timestamp-wrapper-${threadType}`}>
                <div className={`message-thread-text-${threadType}`}>{msg.text}</div>
                <div className="message-thread-timestamp">{moment(msg.date).format('h:mm a')}</div>
              </div>
            </div>
          );
        })}
        <div ref={el => (this.messagesEnd = el)} />
      </div>
    );
  }
}

export default MessagesList;
