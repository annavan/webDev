import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "./Auth/AuthService";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = checkUser(); // Check if user is logged in

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth"); // Redirect to login after logout
  };

  if(!isAuthenticated) {
    return null; // Don't render the navbar if not authenticated
  }

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>Home</Link>
      {isAuthenticated && (
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      )}
    </nav>
  );
};


const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
      position: "fixed",
      width: "100%",
      top: 0,
      left: 0,
    },
    logo: {
      textDecoration: "none",
      color: "#fff",
      fontSize: "1.5rem",
    },
    logoutButton: {
      backgroundColor: "#1a1a1a", // Matches the button background in the CSS file
      color: "#fff",
      border: "1px solid transparent",
      padding: "0.6em 1.2em",
      fontSize: "1em",
      fontWeight: "500",
      borderRadius: "8px", // Matches the button style in the CSS file
      cursor: "pointer",
      transition: "border-color 0.25s",
      marginRight: "20px", // Add a margin to the right to slightly move it to the left
    },
};

export default NavBar;