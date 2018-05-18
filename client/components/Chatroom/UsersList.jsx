import React from 'react';

const UsersList = ({ users }) => {
  return (
    <div className="users-list-wrapper">
      <div className="users-list-title">Online Users</div>
      <div className="users-list-online">
        {users.map(obj => {
          return (
            <div key={obj._id} className="current-users-wrapper">
              <div className="current-users-row">
                {obj.username}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;