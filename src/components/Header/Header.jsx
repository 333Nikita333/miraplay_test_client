import { NavLink } from 'react-router-dom';

const AppBar = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/auth">Authentication</NavLink>
        {/* <NavLink to="/register">Register</NavLink> */}
        {/* <NavLink to="/login">Login</NavLink> */}
      </nav> 
    </header>
  );
};

export default AppBar;
