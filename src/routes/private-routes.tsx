import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ emailVerified }: any) => {
  console.log(emailVerified);

  if (sessionStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }
  // if user has not login redirect to their login
  if (sessionStorage.getItem('token') !== null && emailVerified === 1) {
    return <Outlet />;
  }
  if (emailVerified === 0) {
    return <Navigate to="/verify_email" />;
  }
};

export default PrivateRoutes;
