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
import Collection from '@/pages/collection/collection';
import { AdminDashboard } from '@/pages/admin-dashboard/admin-dashboard';
import { Loading } from '@/components/ui/loading';
import NotFound from '@/pages/not-found/not-found';

function PageRoutes() {
  return (
    <BrowserRouter>
      <MainNav />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default PageRoutes;
