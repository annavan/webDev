// import React, { useState } from "react";
// import Parse from "parse";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import { createUser } from "../../Services/Users.jsx"; // Assuming this is your service for creating users
// import MainList from "./MainList.jsx";

// const Main = () => {
//   const [newUser, setNewUser] = useState({
//     firstName: "",
//     lastName: "",
//     birthday: "",
//     email: "",
//     password: "",
//   });

//   const [createdUser, setCreatedUser] = useState(null);
//   const navigate = useNavigate(); // Navigate hook for redirection

//   const handleCreateAccount = async (e) => {
//     e.preventDefault();

//     try {
//       // Ensure no existing invalid session
//       await Parse.User.logOut();

//       const createdAccount = await createUser(
//         newUser.firstName,
//         newUser.lastName,
//         newUser.birthday,
//         newUser.email,
//         newUser.password
//       );
      
//       setCreatedUser(createdAccount); // Set the created user
//       // Redirect to home page after account creation
//       navigate("/home"); // Redirects user to the home page
//     } catch (error) {
//       console.error("Error creating account:", error);
//     }
//   };

//   return (
//     <div>
//       {!createdUser ? (
//         <>
//           <h1>Create Account</h1>
//           <form onSubmit={handleCreateAccount}>
//             <label>
//               First Name:
//               <input
//                 type="text"
//                 value={newUser.firstName}
//                 onChange={(e) =>
//                   setNewUser({ ...newUser, firstName: e.target.value })
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Last Name:
//               <input
//                 type="text"
//                 value={newUser.lastName}
//                 onChange={(e) =>
//                   setNewUser({ ...newUser, lastName: e.target.value })
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Birthday:
//               <input
//                 type="date"
//                 value={newUser.birthday}
//                 onChange={(e) =>
//                   setNewUser({ ...newUser, birthday: e.target.value })
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 value={newUser.email}
//                 onChange={(e) =>
//                   setNewUser({ ...newUser, email: e.target.value })
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 value={newUser.password}
//                 onChange={(e) =>
//                   setNewUser({ ...newUser, password: e.target.value })
//                 }
//                 required
//               />
//             </label>
//             <button type="submit">Create Account</button>
//           </form>
//         </>
//       ) : (
//         <h1>Account created successfully! Welcome, {createdUser.firstName}!</h1>
//       )}
//     </div>
//   );
// };

// export default Main;
