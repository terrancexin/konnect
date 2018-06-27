import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMessages } from '../../actions';
import { socketOff } from '../../actions/socket';
import { fetchGiphy } from '../../actions/giphy';

import Footer from '../Footer';
import MessagesList from './MessagesList';
import MessageSubmit from './MessageSubmit';
import Notice from '../Notice';
import UserSection from './UserSection';
import PrivateLockBtn from './PrivateLockBtn';
import PrivateChat from './PrivateChat';

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
  loading: state.loading,
  messages: state.messages,
  missedMsg: state.missedMsg,
  username: state.username,
  users: state.users,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
  isLocked: state.isLocked,
  toggleMissedMsg: state.toggleMissedMsg,
});

Chatroom.propTypes = {
  fetchGiphy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  missedMsg: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  getMessages: PropTypes.func.isRequired,
  socketOff: PropTypes.func.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  toggleMissedMsg: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  fetchGiphy,
  getMessages,
  socketOff,
})(Chatroom);
