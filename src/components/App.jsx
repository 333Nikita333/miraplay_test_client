import { lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCurrentUser } from '../services/api';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice/authSlice';

const HomePage = lazy(() => import('../pages/Home'));
const AuthPage = lazy(() => import('../pages/Auth'));
const GamesPage = lazy(() => import('../pages/Games'));

const App = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(state => state.auth);
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (user && !currentUser) {
      dispatch(setUser({ user }));
    }
  }, [currentUser, dispatch, user]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/games"
          element={!isLoading && currentUser ? <GamesPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!isLoading && !currentUser ? <AuthPage /> : <Navigate to="/games" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
