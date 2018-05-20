import React from 'react';

const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      <div className="users-list-title">Members</div>
      <div className="users-list">
        {users.map(user => {
          return (
            <div key={user._id} className="each-user">
              <div className="online-icon"> . </div>
              <div className="each-user-name">
                {user.username}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;