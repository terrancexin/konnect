/* global ROOT_URL */

import React from 'react';
import PropTypes from 'prop-types';

const UsersList = ({ users }) => (
  <ul className="users-list">
    {users.map((user) => {
      const { id, onlineStatus, username } = user;
      const isOnline = onlineStatus ? 'active' : 'inactive';

      return (
        <li key={id} className="each-user">
          <img
            className={`online-${isOnline}`}
            src={`${ROOT_URL}/images/online.png`}
            alt="online"
          />
          <span className={`each-user-name-${isOnline}`}>{username}</span>
        </li>
      );
    })}
  </ul>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersList;
