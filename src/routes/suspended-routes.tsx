import { session } from '@/lib/session';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SuspendedRoutes = () => {
  const isBanned = useSelector(
    (state: RootState) => state.user.currentUserBanStatus
  );

  if (isBanned == 1) {
    return <Outlet />;
  }

  if (!session() || isBanned === 0) {
    return <Navigate to="/404" />;
  }
};

export default SuspendedRoutes;
