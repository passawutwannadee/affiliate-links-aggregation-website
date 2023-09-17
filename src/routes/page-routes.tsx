import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '@/pages/register';
import { MainNav } from '@/components/main-nav';
import { Login } from '@/pages/login';
import Profile from '@/pages/profile';

function PageRoutes() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
