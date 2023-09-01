import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const setToken = (token) => {
      setAuthToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Auth from Login: ", token)
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
