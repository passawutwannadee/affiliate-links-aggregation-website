import { session } from '@/lib/session';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ emailVerified }: any) => {
  console.log(emailVerified);

  if (session() === null) {
    return <Navigate to="/" />;
  }
  // if user has not login redirect to their login
  if (session() !== null && emailVerified === 1) {
    return <Outlet />;
  }
  if (emailVerified === 0) {
    return <Navigate to="/verify_email" />;
  }
};

export default PrivateRoutes;
