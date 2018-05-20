import React from 'react';

const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      <div className="users-list">
        {users.map(user => {
          const onlineStatus = user.onlineStatus ? 'active' : 'inactive';
          
          return (
            <div key={user._id} className="each-user">
              <img className={`online-${onlineStatus}`}src="http://localhost:3000/images/online.png" alt="online" />
              <div className={`each-user-name-${onlineStatus}`}>
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