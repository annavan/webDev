import React, { useEffect, useState } from "react";
import { getUser, createUser } from "../../Services/Users.js";
import MainList from "./MainList.js";

const Main = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
  });
  const [createdUser, setCreatedUser] = useState(null);

  useEffect(() => {
    getUser().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    createUser(
      users.length + 1,
      newUser.firstName,
      newUser.lastName,
      newUser.birthday,
      newUser.email,
      newUser.password
    )
      .then(() => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setCreatedUser(newUser);
      })
      .catch(() => alert("Error creating account"));
  };

  const numUsersAlert = () => {
    alert(`There are currently ${users.length} registered user(s)`);
  };

  return (
    <div>
      {createdUser ? (
        <h1>Account created successfully! Welcome, {createdUser.firstName}!</h1>
      ) : (
        <>
          <h1>Create Account</h1>
          <form onSubmit={handleCreateAccount}>
            <label>
              First Name:
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Birthday:
              <input
                type="date"
                value={newUser.birthday}
                onChange={(e) =>
                  setNewUser({ ...newUser, birthday: e.target.value })
                }
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </label>
            <button type="submit">Create Account</button>
          </form>
        </>
      )}
      <MainList users={users} onNumUsersClick={numUsersAlert} />
    </div>
  );
};

export default Main;