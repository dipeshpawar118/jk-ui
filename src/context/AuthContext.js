import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the context
const AuthContext = createContext();

// Create a provider for the AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);

  // Check if user is authenticated based on the token
  useEffect(() => {
    if (token) {
      // Optionally, you can decode the token to fetch user data or verify it
      // Example: const decoded = jwt_decode(token);
      // setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  // Function to handle login
  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('jwt_token', token); // Store token in localStorage
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
