import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Main from "./Main/Main.jsx"; // Account creation/login page
import Home from "./Home/Home.jsx"; // Home page
import Settings from "./Settings/Settings.jsx"; // Settings page
import Footer from "./Footer/Footer.jsx"; // Footer component
import Login from "./Login/Login.jsx"; // Login component

const Components = () => {
    return (
      <Router>
        <Routes>
          {/* Default redirect to login page */}
          {/* Change back to default login */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    );
  };

export default Components;
