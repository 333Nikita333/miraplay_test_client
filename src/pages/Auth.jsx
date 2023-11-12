import { useState } from 'react';
import { useLogin, useRegister } from '../services/api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const { loginUser, isErrorLogin, loginErrorMessage } = useLogin();
  const { registerUser, isErrorRegister, registerErrorMessage } = useRegister();

  const handleAuthAction = async e => {
    e.preventDefault();

    if (isRegister) {
      await registerUser({ email, password });
    } else {
      await loginUser({ email, password });
    }
  };

  return (
    <section className="Authorization_content">
      <form className="Authorization_form" onSubmit={handleAuthAction}>
        <h3 className="Authorization_title">Спробуй нові відчуття</h3>
        <p className="Authorization_subTitle">
          {isRegister
            ? 'Зареєструйся, щоб грати на максималках у свої улюблені ігри'
            : 'Увійди, щоб грати на максималках у свої улюблені ігри'}
        </p>
        <label className="Authorization_label">
          введіть ваш email:
          <input
            className="Authorization_input"
            type="text"
            name="email"
            placeholder="youremail@miraplay.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="Authorization_label">
          введіть ваш пароль:
          <input
            className="Authorization_input"
            type="password"
            placeholder="ваш пароль"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button className="Authorization_submitBtn" type="submit" disabled={!email || !password}>
          {isRegister ? 'РЕЄСТРАЦІЯ' : 'ВХІД'}
        </button>
      </form>

      {isRegister && isErrorRegister && (
        <div style={{ color: 'red', fontSize: '23px', textAlign: 'center' }}>
          {registerErrorMessage}
        </div>
      )}
      {!isRegister && isErrorLogin && (
        <div style={{ color: 'red', fontSize: '23px', textAlign: 'center' }}>
          {/* Error logging in */}
          {loginErrorMessage}
        </div>
      )}

      <button
        className="Authorization_changeAuth"
        type="button"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Вже є аккаунт?' : 'Потрібен аккаунт?'} Тисни
      </button>
    </section>
  );
};

export default Auth;
