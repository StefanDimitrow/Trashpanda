// src/services/guards/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ element: Element, restricted = false, ...rest }) => {
  const { user } = useAuth();

  return user && restricted ? <Navigate to="/junk-collection" /> : <Element {...rest} />;
};

export default PublicRoute;


