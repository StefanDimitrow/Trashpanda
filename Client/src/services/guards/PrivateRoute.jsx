// src/services/guards/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;


