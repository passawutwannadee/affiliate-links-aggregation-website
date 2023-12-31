import { session } from '@/lib/session';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ currentUser }: any) => {
  // if user is already login redirect to their profile
  if (session() === null) {
    return <Outlet />;
  } else {
    return <Navigate to={`/profile/${currentUser}`} />;
  }
};

export default PublicRoutes;
