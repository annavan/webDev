import React, { useState, useEffect } from "react";
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
import Parse from 'parse';

export default function Components() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = Parse.User.current();
      const isAuth = !!currentUser;
      setIsAuthenticated(isAuth);
    };

    // Check auth immediately
    checkAuth();

    // Listen for storage events (which includes Parse session changes)
    window.addEventListener('storage', checkAuth);

    // Also check auth periodically in case the event listener doesn't catch all changes
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {isAuthenticated && <NavBar />}
        <main className={`flex-grow ${isAuthenticated ? 'mt-16' : ''}`}>
          <Routes>
            <Route 
              path="/auth" 
              element={isAuthenticated ? <Navigate to="/" replace /> : <AuthModule />} 
            />
            <Route 
              path="/auth/register" 
              element={isAuthenticated ? <Navigate to="/" replace /> : <AuthRegister />} 
            />
            <Route 
              path="/auth/login" 
              element={isAuthenticated ? <Navigate to="/" replace /> : <AuthLogin />} 
            />
            {/* route for settings as protected route */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account-settings"
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
            <Route 
              path="*" 
              element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
