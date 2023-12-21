import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainNav } from '@/components/main-nav';

const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));

import Profile from '@/pages/profile/profile';
import Settings from '@/pages/settings/settings';
import { AccountForm } from '@/pages/settings/account/account-form';
import { PasswordForm } from '@/pages/settings/password/password-form';
import Product from '@/pages/product/product';
import Collection from '@/pages/collection/collection';
import { AdminDashboard } from '@/pages/admin-dashboard/admin-dashboard';
import { Loading } from '@/components/ui/loading';
import NotFound from '@/pages/not-found/not-found';
import PublicRoutes from './public-routes';
import PrivateRoutes from './private-routes';
import VerifyEmail from '@/pages/verify-email/verify-email';
import VerifyEmailAlert from '@/pages/verify-email/verify-email-alert';
import { useQuery } from 'react-query';
import { accountAPI } from '@/services/account-api';

function PageRoutes() {
  const hasSessionToken = Boolean(sessionStorage.getItem('token'));

  const { data, isLoading, isError } = useQuery(
    ['account_data'],
    () => accountAPI(),
    { enabled: hasSessionToken }
  );

  if (isLoading) {
    // Render loading state
    return <Loading />;
  }

  return (
    <>
      {data ? console.log(data.data.email_verify) : null}
      <BrowserRouter>
        <MainNav
          username={data ? data.data.username : null}
          profilePicture={data ? data.data.profile_picture : null}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/profile/:username"
              element={
                <Profile currentUser={data ? data.data.username : null} />
              }
            />
            <Route
              path="/verify_email/:email_verify_token"
              element={<VerifyEmail />}
            />
            <Route path="/verify_email" element={<VerifyEmailAlert />} />

            {/* ///////////////////////// PUBLIC ROUTES ////////////////////////// */}
            <Route
              element={
                <PublicRoutes currentUser={data ? data.data.username : null} />
              }
            >
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/collection" element={<Collection />} />
            </Route>

            {/* ///////////////////////// PRIVATE ROUTES ////////////////////////// */}
            <Route
              element={
                <PrivateRoutes
                  emailVerified={data ? data.data.email_verify : null}
                />
              }
            >
              <Route path="/product/:id" element={<Product />} />
              <Route path="/collection" element={<Collection />} />
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
