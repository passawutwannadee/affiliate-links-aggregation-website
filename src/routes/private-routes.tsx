import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = (_: any) => {
  // if user has not login redirect to their login
  return sessionStorage.getItem('token') !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
