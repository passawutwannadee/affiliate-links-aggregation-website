import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ currentUser }: any) => {
  // if user is already login redirect to their profile
  if (sessionStorage.getItem('token') === null) {
    return <Outlet />;
  } else {
    return <Navigate to={`/profile/${currentUser}`} />;
  }
};

export default PublicRoutes;
