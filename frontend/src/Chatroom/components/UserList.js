import React from 'react';

const UserList = ({ users }) => {

  return (
    <div className="user-list p-4">
      <h2 className="text-xl font-bold">Users in Room</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.user_id} className="p-2 border-b border-gray-300">
              {user.user_id} 
            </li>
          ))
        ) : (
          <li>No users in the room yet.</li> // Message if there are no users
        )}
      </ul>
    </div>
  );
};

export default UserList;
