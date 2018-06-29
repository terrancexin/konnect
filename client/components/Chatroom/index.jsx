import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGiphy } from '../../actions/giphy';
import { getMessages } from '../../actions/message';
import { socketOff } from '../../actions/socket';

import Footer from '../Footer';
import MessagesList from './MessagesList';
import MessageSubmit from './MessageSubmit';
import Notice from '../Notice';
import PrivateChat from './PrivateChat';
import PrivateLockBtn from './PrivateLockBtn';
import UserSection from './UserSection';

class Chatroom extends Component {
  componentDidMount() {
    this.props.getMessages();
    this.props.fetchGiphy();
  }

  componentWillUnmount() {
    this.props.socketOff();
  }

  render() {
    const {
      loading,
      missedMsg,
      messages,
      username,
      users,
      isMatchPrivatePassword,
      isLocked,
      toggleMissedMsg,
    } = this.props;
    const userPluralCheck = users.length <= 1 ? 'user' : 'users';

    return (
      <div className="chatroom" id="chatroom">
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
            <UserSection />

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
              <MessageSubmit />
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
  isLocked: state.isLocked,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
  loading: state.loading,
  messages: state.messages,
  missedMsg: state.missedMsg,
  username: state.username,
  users: state.users,
  toggleMissedMsg: state.toggleMissedMsg,
});

Chatroom.propTypes = {
  fetchGiphy: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  missedMsg: PropTypes.array.isRequired,
  socketOff: PropTypes.func.isRequired,
  toggleMissedMsg: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  fetchGiphy,
  getMessages,
  socketOff,
})(Chatroom);
