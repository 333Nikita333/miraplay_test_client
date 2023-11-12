import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../services/api';

const AppBar = () => {
  const user = useSelector(state => state.auth.user);
  const { logoutUser, isLoadingLogout } = useLogout();

  const handleLogout = async () => {
    try {
      logoutUser();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav_list">
          <NavLink className="nav_item" to="/">
            <span className="nav_title">Home</span>
          </NavLink>
          {user ? (
            <>
              <NavLink className="nav_item" to="/games">
                <span className="nav_title">Games</span>
              </NavLink>
              <div>
                Welcome, {user.email}!
                <button className="btn_logout" onClick={handleLogout} disabled={isLoadingLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink className="nav_item" to="/auth">
              <span className="nav_title">Authentication</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
