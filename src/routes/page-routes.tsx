import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainNav } from '@/components/main-nav';

const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));

import Profile from '@/pages/profile/profile';
import Settings from '@/pages/settings/settings';
import { AccountForm } from '@/pages/settings/account/account-form';
import { PasswordForm } from '@/pages/settings/password/password-form';
import Product from '@/pages/profile/products/product/product';
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
  setCurrentRole,
  setCurrentUser,
  setCurrentUserBanStatus,
  setCurrentUserDN,
  setCurrentUserPFP,
  setEmailVerified,
} from '@/redux/features/userSlice';
import VerifyEmailRoute from './verify-email-route';
import SuspendedAlert from '@/pages/suspended/suspended-alert';
import AuthRoutes from './auth-routes';
import SuspendedRoutes from './suspended-routes';
import AppealForm from '@/pages/suspended/appeal-form/appeal-form';
import AdminRoutes from './admin-routes';

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
        dispatch(setCurrentRole(response.data.role_id));
        dispatch(setCurrentUserBanStatus(response.data.ban_status));
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
            <Route element={<PublicRoutes />}>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/verify-email/:email_verify_token"
                element={<VerifyEmail />}
              />
              <Route path="/collection/:id" element={<Collection />} />
            </Route>
            <Route element={<VerifyEmailRoute />}>
              <Route path="/verify-email" element={<VerifyEmailAlert />} />
            </Route>

            {/* ///////////////////////// PUBLIC ROUTES ////////////////////////// */}
            <Route element={<AuthRoutes />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* ///////////////////////// PRIVATE ROUTES ////////////////////////// */}
            <Route element={<PrivateRoutes />}>
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

            {/* ///////////////////////// PRIVATE ROUTES ////////////////////////// */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<SuspendedRoutes />}>
              <Route path="/suspended" element={<SuspendedAlert />} />
              <Route path="/appeal-form" element={<AppealForm />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default PageRoutes;
