import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { checkUser } from "../Components/Auth/AuthService";

// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  //if user is authenticated, print it
  if (checkUser()) {
    console.log("Authenticated");
  }
  //const navigate = useNavigate();
 
  if (checkUser()) {
    return <Component />;
  } else {
    // if user is not authenticated, redirect them to the login page
    return <Navigate to="/auth" replace />;
  }

};

export default ProtectedRoute;
