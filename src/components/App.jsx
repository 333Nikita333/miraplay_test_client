import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

const HomePage = lazy(() => import('../pages/Home'));
const AuthPage = lazy(() => import('../pages/Auth'));
// const LoginPage = lazy(() => import('../pages/Login'));
// const RegisterPage = lazy(() => import('../pages/Register'));
const GamesPage = lazy(() => import('../pages/Games'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} /> 
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/games" element={<GamesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
