import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "../Services/ProtectedRoute.jsx";
//import MainList from "./Main/MainList.jsx";
//home to navigate as protected route
import Home from "./Home/Home.jsx";
import Settings from "./Settings/Settings.jsx";
import NavBar from "./NavBar.jsx";
import AccountSettings from "./AccountSettings/AccountSettings.jsx";

export default function Components() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        {/* route for settings as protected route */}
        <Route
          path="/settings"
          element={<ProtectedRoute path="/settings" element={Settings} />}
        />
        <Route
          path="/"
          element={<ProtectedRoute path="/" element={Home} />}
        />
        <Route
          path="/account-settings"
          element={<ProtectedRoute path="/account-settings" element={AccountSettings} />}
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
