import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main/Main.jsx"; // Account creation/login page
import Home from "./Home/Home.jsx"; // Home page
import Settings from "./Settings/Settings.jsx"; // Settings page
import Footer from "./Footer/Footer.jsx"; // Footer component

const Components = () => {
  return (
    <Router>
      <Routes>
        {/* Route for login or account creation page */}
        <Route path="/create-account" element={<Main />} /> 
        {/* Home page route */}
        <Route path="/" element={<Home />} /> 
        {/* Settings page route */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Components;
