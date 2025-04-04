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
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);

  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

//logout user using async so that it waits for the logout to complete before reloading the page
export const logoutUser = async () => {
  try {
    await Parse.User.logOut(); // Waits for the logout to complete
    window.location.reload(); // Ensures UI updates properly
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

export const checkUser = () => {
  return !!Parse.User.current(); // Returns true if a user is logged in
};
