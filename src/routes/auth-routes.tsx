import { session } from '@/lib/session';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // if user is already login redirect to their profile
  if (session() === false) {
    return <Outlet />;
  } else {
    return <Navigate to={`/profile/${currentUser}`} />;
  }
};

export default AuthRoutes;
