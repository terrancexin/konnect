import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPrivateMessages } from '../../actions/private';

import MessagesList from './MessagesList';
import MessageSubmit from './MessageSubmit';
import Notice from '../Notice';
import UserSection from './UserSection';

class PrivateChat extends Component {
  componentDidMount() {
    document.getElementById('chatroom').style.backgroundColor = 'rgb(95, 98, 99)';
    document.getElementById('bg').style.backgroundColor = 'rgb(95, 98, 99)';
    this.props.getPrivateMessages();
  }

  componentWillUnmount() {
    document.getElementById('chatroom').style.backgroundColor = 'floralwhite';
    document.getElementById('bg').style.backgroundColor = 'floralwhite';
  }

  render() {
    const { username, loading, messagesPrivate } = this.props;

    return (
      <div className="chat-window">
        <Notice />
        <UserSection />
        <div className="messages-section">
          <MessagesList
            currentUser={username}
            loading={loading}
            messages={messagesPrivate}
          />
          <MessageSubmit />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  messagesPrivate: state.messagesPrivate,
  username: state.username,
});

PrivateChat.propTypes = {
  loading: PropTypes.bool.isRequired,
  messagesPrivate: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getPrivateMessages: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getPrivateMessages,
})(PrivateChat);
