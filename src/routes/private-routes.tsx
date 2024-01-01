import { session } from '@/lib/session';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ emailVerified }: { emailVerified: number }) => {
  console.log(emailVerified);

  // if user has not login redirect to their login
  if (session() === false) {
    return <Navigate to="/" />;
  }

  if (session() === true && emailVerified === 1) {
    return <Outlet />;
  }
  if (emailVerified === 0) {
    return <Navigate to="/verify_email" />;
  }
};

export default PrivateRoutes;
