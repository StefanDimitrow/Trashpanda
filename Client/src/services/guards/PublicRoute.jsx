import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ element: Element, restricted = false, ...rest }) => {
  const { user, loading } = useAuth();

  // While authentication state is loading, show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in and the route is restricted, redirect them to the profile page
  return user && restricted ? <Navigate to="/profile" /> : <Element {...rest} />;
};

export default PublicRoute;


