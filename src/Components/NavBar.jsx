import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "./Auth/AuthService";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = checkUser();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="h-16 flex justify-between items-center px-6 bg-gray-800 text-white fixed w-full top-0 left-0 shadow-md z-50">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link to="/settings" className="text-xl font-semibold text-white hover:text-gray-300 transition-colors">
          Settings
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-gray-700 hover:bg-gray-600 border border-transparent px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
