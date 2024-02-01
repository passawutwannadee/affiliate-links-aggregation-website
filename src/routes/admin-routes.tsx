import { session } from '@/lib/session';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );
  const isBanned = useSelector(
    (state: RootState) => state.user.currentUserBanStatus
  );
  const currentRole = useSelector((state: RootState) => state.user.currentRole);

  // if user has not login redirect to their login
  if (session() === false) {
    return <Navigate to="/" />;
  }

  if (session() === true && emailVerified === 1 && currentRole === 2) {
    return <Outlet />;
  }

  if (session() && isBanned === 1) {
    return <Navigate to={`/suspended`} />;
  }

  if (session() && currentRole !== 2) {
    return <Navigate to={`/400`} />;
  }

  if (emailVerified === 0) {
    return <Navigate to="/verify-email" />;
  }
};

export default AdminRoutes;
