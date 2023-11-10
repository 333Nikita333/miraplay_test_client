import { useState } from 'react';
import { useLogin, useRegister } from '../services/api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const { loginUser, isLoading: isLoggingIn, isError: loginError } = useLogin();
  const { registerUser, isLoading: isRegistering, isError: registerError } = useRegister();
  const handleAuthAction = async () => {
      console.log(email, password)
    if (isRegister) {
      await registerUser({ email, password });
    } else {
      await loginUser({ email, password });
    }
  };
  return (
    <div>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleAuthAction} disabled={isRegistering || isLoggingIn}>
        {isRegister ? 'Register' : 'Login'}
      </button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
      {isRegister && registerError && <div>Error registering</div>}
      {!isRegister && loginError && <div>Error logging in</div>}
    </div>
  );
};

export default Auth;
