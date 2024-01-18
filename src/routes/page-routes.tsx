import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainNav } from '@/components/main-nav';

const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));

import Profile from '@/pages/profile/profile';
import Settings from '@/pages/settings/settings';
import { AccountForm } from '@/pages/settings/account/account-form';
import { PasswordForm } from '@/pages/settings/password/password-form';
import Product from '@/pages/product/product';
import Collection from '@/pages/profile/collections/collection/collection';
import { AdminDashboard } from '@/pages/admin-dashboard/admin-dashboard';
import { Loading } from '@/components/ui/loading';
import NotFound from '@/pages/not-found/not-found';
import PublicRoutes from './public-routes';
import PrivateRoutes from './private-routes';
import VerifyEmail from '@/pages/verify-email/verify-email';
import VerifyEmailAlert from '@/pages/verify-email/verify-email-alert';
import { useQuery } from 'react-query';
import { accountAPI } from '@/services/account-api';
import { session } from '@/lib/session';
import { useDispatch } from 'react-redux';
import {
  setCurrentUser,
  setCurrentUserDN,
  setCurrentUserPFP,
  setEmailVerified,
} from '@/redux/features/userSlice';
import VerifyEmailRoute from './verify-email-route';

function PageRoutes() {
  const dispatch = useDispatch();
  const { isLoading } = useQuery(['account_data'], () => accountAPI(), {
    enabled: session(),
    onSuccess: (response) => {
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data.username));
        dispatch(setEmailVerified(response.data.email_verify));
        dispatch(setCurrentUserDN(response.data.display_name));
        dispatch(setCurrentUserPFP(response.data.profile_picture));
      }
    },
  });

  if (isLoading) {
    // Render loading state
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <MainNav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/verify-email/:email_verify_token"
              element={<VerifyEmail />}
            />
            <Route element={<VerifyEmailRoute />}>
              <Route path="/verify-email" element={<VerifyEmailAlert />} />
            </Route>

            {/* ///////////////////////// PUBLIC ROUTES ////////////////////////// */}
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/collection" element={<Collection />} />
            </Route>

            {/* ///////////////////////// PRIVATE ROUTES ////////////////////////// */}
            <Route element={<PrivateRoutes />}>
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/settings"
                element={<Settings children={<AccountForm />} />}
              />
              <Route
                path="/settings/account"
                element={<Settings children={<AccountForm />} />}
              />
              <Route
                path="/settings/password"
                element={<Settings children={<PasswordForm />} />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default PageRoutes;
