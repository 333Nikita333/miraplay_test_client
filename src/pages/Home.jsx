import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <section className="HomeHero_container">
      <div className="HomeHero_content">
        <div className="HomeHero_leftSide">
          <p className="HomeHero_navInfo">Добро пожаловать!</p>
          <h1 className="HomeHero_title">Наша библиотека топовых игр</h1>
          <p className="HomeHero_description">
            {!user && <NavLink to="/auth">Авторизируйтесь</NavLink>}
            Выберете игру из нашей библиотеки, чтобы начать играть <span>бесплатно 30 минут</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
