import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '@/pages/register/register';
import { MainNav } from '@/components/main-nav';
import { Login } from '@/pages/login/login';
import Profile from '@/pages/profile/profile';
import Settings from '@/pages/settings/settings';
import { AccountForm } from '@/pages/settings/account/account-form';
import { PasswordForm } from '@/pages/settings/password/password-form';
import Product from '@/pages/product/product';

function PageRoutes() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
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
    </BrowserRouter>
  );
}

export default PageRoutes;
