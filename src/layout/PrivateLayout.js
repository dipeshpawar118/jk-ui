// src/layout/PrivateLayout.js
import React, { useEffect } from "react";
import { Link, Outlet, Redirect, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateLayout = () => {
  const { logout, user, token } = useAuth();
  const navigate = useNavigate();
  console.log("user ", user);
  console.log("token ", token);

  useEffect(() => {
    if (!user || !token) {
      console.log("unauth");
      navigate("/login");
    }
  }, [user, token, navigate]); // Dependency array ensures this effect runs when user or token changes

  // If user or token is missing, we don't render anything until redirection occurs
  if (!user || !token) {
    return null; // This prevents the layout from rendering when the user isn't authenticated
  }

  return (
    <div className="layout-container">
      <div className="main-content h-10/12">
        <main className="content">
          <Outlet />
        </main>
      </div>

      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default PrivateLayout;
