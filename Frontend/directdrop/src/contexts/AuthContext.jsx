import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        // Check if the token is expired
        const isTokenExpired = checkTokenExpiry(token);
        if (isTokenExpired) {
          setIsAuthenticated(false);
          Cookies.remove('accessToken'); // Remove the expired token
          alert("Your session has expired. Please log in again.");
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkToken();
    const interval = setInterval(checkToken, 60000); // Periodic token check
    return () => clearInterval(interval);
  }, []);

  const checkTokenExpiry = (token) => {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = tokenPayload.exp * 1000;
    return Date.now() >= expiry;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
