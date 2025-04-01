import React from "react";

const MainList = ({ users = [], onNumUsersClick }) => {
  return (
    <div>
      <hr />
      <button onClick={onNumUsersClick}>Show Number of Users</button>
    </div>
  );
};

export default MainList;
