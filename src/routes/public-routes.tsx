import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = (_: any) => {
  // if user is already login redirect to their profile
  return sessionStorage.getItem('token') === null ? (
    <Outlet />
  ) : (
    <Navigate to="/profile" />
  );
};

export default PublicRoutes;
