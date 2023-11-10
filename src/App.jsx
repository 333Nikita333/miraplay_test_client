import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const GamesPage = lazy(() => import('./pages/Games'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/login"
          element={<PrivateRoute redirectTo="/games" component={<LoginPage />} />}
        />
        <Route
          path="/games"
          element={<PrivateRoute redirectTo="/login" component={<GamesPage />} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
