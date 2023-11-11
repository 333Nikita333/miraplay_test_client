import { useState } from 'react';
import { useLogin, useRegister } from '../services/api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const { loginUser, isErrorLogin } = useLogin();
  const { registerUser, isErrorRegister } = useRegister();

  const handleAuthAction = async e => {
    e.preventDefault();

    if (isRegister) {
      await registerUser({ email, password });
    } else {
      await loginUser({ email, password });
    }
  };

  return (
    <div>
      <form onSubmit={handleAuthAction}>
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!email || !password}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>

      {isRegister && isErrorRegister && <div>Error registering</div>}
      {!isRegister && isErrorLogin && <div>Error logging in</div>}
    </div>
  );
};

export default Auth;
