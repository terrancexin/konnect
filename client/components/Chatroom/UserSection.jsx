import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearMissedMsg,
  logOutUser,
  handleToggleMissedMsg,
} from '../../actions';

import NavBtns from './NavBtns';
import UsersList from './UsersList';

class UserSection extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    const { user } = this.props;

    this.props.logOutUser(user);
  }

  render() {
    const {
      missedMsg,
      username,
      users,
      toggleMissedMsg,
    } = this.props;
    const onlineUsers = users.filter(user => user.onlineStatus).length;

    return (
      <section className="chat-window-left-section">
        <NavBtns
          clearMissedMsg={this.props.clearMissedMsg}
          handleLogOut={this.handleLogOut}
          handleToggleMissedMsg={this.props.handleToggleMissedMsg}
          missedMsg={missedMsg}
          toggleMissedMsg={toggleMissedMsg}
          username={username}
        />
        <div className="online-users">{onlineUsers} online</div>
        <UsersList users={users} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  missedMsg: state.missedMsg,
  username: state.username,
  user: state.user,
  users: state.users,
  toggleMissedMsg: state.toggleMissedMsg,
});

UserSection.propTypes = {
  missedMsg: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  clearMissedMsg: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  handleToggleMissedMsg: PropTypes.func.isRequired,
  toggleMissedMsg: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  clearMissedMsg,
  logOutUser,
  handleToggleMissedMsg,
})(UserSection);
