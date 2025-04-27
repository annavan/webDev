import React from "react";
import { Navigate } from "react-router-dom";
import Parse from 'parse';

const ProtectedRoute = ({ children }) => {
  const currentUser = Parse.User.current();
  
  if (!currentUser) {
    // User is not authenticated, redirect to auth page
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated, render the protected content
  return (
    <div className="protected-content">
      {children}
    </div>
  );
};

export default ProtectedRoute;
