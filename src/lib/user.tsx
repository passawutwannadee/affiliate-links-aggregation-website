import { useQuery } from 'react-query';
import { accountAPI } from '@/services/account-api';
import { session } from '@/lib/session';
import { useDispatch } from 'react-redux';
import {
  setCurrentRole,
  setCurrentUser,
  setCurrentUserBanStatus,
  setCurrentUserDN,
  setCurrentUserPFP,
  setEmailVerified,
} from '@/redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import globalRouter from './global-navigate';
import { Loading } from '@/components/ui/loading';

const User = ({ handleLoading }: { handleLoading: () => void }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const { isLoading } = useQuery(['account_data'], () => accountAPI(), {
    enabled: session(),
    retry: 0,
    onSuccess: (response) => {
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data.username));
        dispatch(setEmailVerified(response.data.email_verify));
        dispatch(setCurrentUserDN(response.data.display_name));
        dispatch(setCurrentUserPFP(response.data.profile_picture));
        dispatch(setCurrentRole(response.data.role_id));
        dispatch(setCurrentUserBanStatus(response.data.ban_status));
      }
    },
  });

  if (isLoading) {
    handleLoading;
    return <Loading />;
  }

  return;
};

export default User;
