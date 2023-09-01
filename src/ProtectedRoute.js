import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Higher-order component for protected routes
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Navigate to="/auth/login" />
      )
    }
  />
);


export default ProtectedRoute;