import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../services/api';

const AppBar = () => {
  const { token } = useSelector(state => state.auth);
  const user = useSelector(state => state.auth.user);
  const { logoutUser, isLoadingLogout } = useLogout(token);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        {user ? (
          <>
            <NavLink to="/games">Games</NavLink>
            <button onClick={handleLogout} disabled={isLoadingLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth">Authentication</NavLink>
        )}
      </nav>
    </header>
  );
};

export default AppBar;
