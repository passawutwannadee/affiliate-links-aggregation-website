import { session } from '@/lib/session';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const VerifyEmailRoute = () => {
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  if (emailVerified === 0) {
    return <Outlet />;
  }
  if (!session()) {
    return <Navigate to="/" />;
  }
};

export default VerifyEmailRoute;
