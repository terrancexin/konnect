import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPrivateMessages } from '../../actions';

import MessagesList from './MessagesList';
import MessageSubmit from './MessageSubmit';
import Notice from '../Notice';
import UserSection from './UserSection';

class PrivateChat extends Component {
  componentDidMount() {
    // this.props.getPrivateMessages();
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
