import { session } from '@/lib/session';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ currentUser }: { currentUser?: string }) => {
  // if user is already login redirect to their profile
  if (session() === false) {
    return <Outlet />;
  } else {
    return <Navigate to={`/profile/${currentUser}`} />;
  }
};

export default PublicRoutes;
