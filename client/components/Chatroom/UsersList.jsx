import React from 'react';
import PropTypes from 'prop-types';

const UsersList = ({ users }) => (
  <div className="users-list">
    {users.map((user) => {
      const { _id, onlineStatus, username } = user;
      const isOnline = onlineStatus ? 'active' : 'inactive';

      return (
        <div key={_id} className="each-user">
          <img
            className={`online-${isOnline}`}
            src={`${ROOT_URL}/images/online.png`}
            alt="online"
          />
          <div className={`each-user-name-${isOnline}`}>{username}</div>
        </div>
      );
    })}
  </div>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersList;
