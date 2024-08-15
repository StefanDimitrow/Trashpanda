import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user, loading } = useAuth();

  // While authentication state is loading, you may want to show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the given component, otherwise redirect to the login page
  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
