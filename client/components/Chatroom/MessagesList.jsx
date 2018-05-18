import React from 'react';
import moment from 'moment';

const MessagesList = ({ messages, currentUser }) => {

  return (
    <div className="messages-list-wrapper">
      {messages.map(obj => {
        let threadType = obj.username === currentUser ? 'current-user' : 'other-user';
        return (
          <div className={`message-thread-${threadType}`} key={obj._id}>
            <div className={`username-timestamp-wrapper-${threadType}`}>
              <div className="message-thread-username">{obj.username}</div>
              <div className="message-thread-timestamp">{moment(obj.date).format('h:mm a')}</div>
            </div>
            <div className="message-thread-text">{obj.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
