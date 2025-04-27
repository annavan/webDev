import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthModule = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = checkUser();
    setIsAuthenticated(user);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2 className="mb-4">Welcome to Our App</h2>
          <div className="d-grid gap-3">
            <Link to="/auth/register" className="btn btn-primary btn-lg">
              Register
            </Link>
            <Link to="/auth/login" className="btn btn-secondary btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
