import React from "react";

const MainList = ({ users = [], onNumUsersClick }) => {
  return (
    <div>
      <hr />
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.email} | {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
      <button onClick={onNumUsersClick}>Show Number of Users</button>
    </div>
  );
};

export default MainList;
