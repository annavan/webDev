import Parse from "parse";

// Create a new user in Parse
export const createUser = async (firstName, lastName, birthday, email, password) => {
  const Account = new Parse.Object("Account"); // Create new Parse object for the Account class

  // Set fields
  Account.set("firstName", firstName);
  Account.set("lastName", lastName);
  Account.set("birthday", birthday);
  Account.set("email", email);
  Account.set("password", password); // Store securely in real applications
  try {
    const User = new Parse.User();
    User.set("username", email); // Username is required in Parse
    User.set("email", email);
    User.set("password", password);
    User.set("firstName", firstName);
    User.set("lastName", lastName);
    User.set("birthday", birthday);

    // Set public read ACL
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(Parse.User.current(), true); // Only the user can write to their own data
    User.setACL(acl);

    const newUser = await User.signUp();
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Fetch all users from Parse
/*export const getUser = async () => {
  try {
    const User = Parse.Object.extend("_User");
    const query = new Parse.Query(User);
    const users = await query.find();
    
    return users.map(user => ({
      id: user.id,
      firstName: user.get("firstName"),
      lastName: user.get("lastName"),
      birthday: user.get("birthday"),
      email: user.get("email"),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};*/

// Fetch all users from the database
export async function getAllUsers() {
    try {
        const User = Parse.Object.extend("_User");
        const query = new Parse.Query(User);
        
        const users = await query.find();
        
        const mappedUsers = users.map(user => {
            const userData = {
                id: user.id,
                username: user.get("username"),
                firstName: user.get("firstName"),
                lastName: user.get("lastName"),
                email: user.get("email")
            };
            return userData;
        });
        
        return mappedUsers;
    } catch (error) {
        console.error("Error fetching users:", error);
        console.error("Error details:", {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return [];
    }
}
