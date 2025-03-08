import React, { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { createUser } from "../../Services/Users.jsx"; // Assuming this is your service for creating users

const LoginList = () => {
  // initialize the state for the new user
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
  });

  const [createdUser, setCreatedUser] = useState(null);
  const navigate = useNavigate(); // Navigate hook for redirection

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      // logout any existing user
      await Parse.User.logOut();

      // Create the new user
      const createdAccount = await createUser(
        newUser.firstName,
        newUser.lastName,
        newUser.birthday,
        newUser.email,
        newUser.password
      );

      // Set the created user in the state
      setCreatedUser(createdAccount); // Set the created user
      // Redirect to home page after account creation
      navigate("/home"); 
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  // html forms to create a new account
  return (
    <div>
      {!createdUser ? (
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
      ) : (
        <h1>Account created successfully! Welcome, {createdUser.firstName}!</h1>
      )}
    </div>
  );
};

export default LoginList;
