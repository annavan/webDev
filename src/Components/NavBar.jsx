import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "./Auth/AuthService";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-md z-50">
      <div className="container-fluid">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-semibold text-white hover:text-gray-300 transition-colors nav-link">
            Home
          </Link>
          <Link to="/settings" className="text-xl font-semibold text-white hover:text-gray-300 transition-colors nav-link">
            Settings
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 border border-transparent px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
