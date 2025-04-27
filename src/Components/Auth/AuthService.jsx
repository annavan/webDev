import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  return Parse.User
    .logIn(currUser.email, currUser.password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      return null;
    });
};

//logout user using async so that it waits for the logout to complete before reloading the page
export const logoutUser = async () => {
  try {
    // Clear the current user from Parse
    await Parse.User.logOut();
    
    // Clear any stored session data
    localStorage.clear();
    sessionStorage.clear();
    
    // Force a hard reload to clear any cached state
    window.location.href = '/auth';
  } catch (error) {
    console.error("Logout error:", error.message);
    // Even if there's an error, we should still try to clear local state
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/auth';
  }
};

export const checkUser = () => {
  return !!Parse.User.current(); // Returns true if a user is logged in
};
