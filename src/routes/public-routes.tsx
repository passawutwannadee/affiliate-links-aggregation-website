import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoutes = () => {
  // if user is already login redirect to their profile
  return sessionStorage.getItem('token') === null ? (
    <Outlet />
  ) : (
    <Navigate to="/home/dashboard" />
  );
};

export default PublicRoutes;
