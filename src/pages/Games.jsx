import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGames, setGames } from '../redux/gamesSlice/gamesSlice';
import { useGames } from '../services/api';

const genres = [
  'ALL',
  'FREE',
  'MOBA',
  'SHOOTERS',
  'LAUNCHERS',
  'MMORPG',
  'STRATEGY',
  'FIGHTING',
  'RACING',
  'SURVIVAL',
  'ONLINE',
];

const Games = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.games);
  const gamesListLength = useSelector(state => state.games.gamesListLength);

  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('ALL');
  const [isNewGamesFirst, setIsNewGamesFirst] = useState(true);

  const { data, isLoading, isError } = useGames(page, genre, isNewGamesFirst);

  useEffect(() => {
    if (data && data.games) {
      const newGames = data.games.filter(
        newGame => !games.some(existingGame => existingGame._id === newGame._id)
      );
      dispatch(setGames({ games: newGames, gamesListLength: data.gamesListLength }));
    }
  }, [data, dispatch, games]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleGenreChange = newGenre => {
    setGenre(newGenre);
    dispatch(clearGames());
    setPage(1);
  };

  const handleDateChange = () => {
    setIsNewGamesFirst(!isNewGamesFirst);
    dispatch(clearGames());
    setPage(1);
  };

  return (
    <section className="AllGames_container">
      {games.length > 0 && (
        <>
          <h4 className="AllGames_title">Our games</h4>

          <div className="AllGames_list-filters">
            <div className="AllGames_filter">
              <ul className="AllGames_genresList">
                {genres.map(g => (
                  <label
                    className={`AllGames_genresItem ${
                      genre === g ? 'AllGames_genresItem-active' : ''
                    }`}
                    key={g}
                  >
                    <input
                      type="radio"
                      value={g}
                      checked={genre === g}
                      onChange={() => handleGenreChange(g)}
                    />
                    {g}
                  </label>
                ))}
              </ul>
            </div>

            <div className="AllGames__date">
              <label>
                <span>Sort:</span>
                <select value={isNewGamesFirst} onChange={() => handleDateChange()}>
                  <option className="AllGames__dateText" value="true">
                    Newest
                  </option>
                  <option className="AllGames__dateText" value="false">
                    Oldest
                  </option>
                </select>
              </label>
            </div>
          </div>

          <ul className="AllGames_gamesList">
            {games.map(game => (
              <div key={game._id}>
                <li className="GameCard_item">
                  <img
                    className="GameCard_img"
                    src={game.gameImage || game.img}
                    alt={game.commonGameName}
                    loading="lazy"
                  />
                  <div className="GameCard_bottomSide">
                    <h4 className="GameCard_title">{game.commonGameName}</h4>
                    <p className="GameCard_description">
                      {game.gameDescription
                        ? game.gameDescription.slice(0, 220) + '...'
                        : 'Опис відсутній'}
                    </p>
                  </div>
                  <div className="GameCard_genre">
                    {game.inTop && <p className="GameCard_topItem">TOP</p>}
                    {game.genre && <p className="GameCard_genreItem">{game.genre}</p>}
                  </div>
                  <p className="GameCard_freeItem">{game.gameClass}</p>
                </li>
              </div>
            ))}
          </ul>
        </>
      )}

      {isLoading && !isError && (
        <div style={{ color: 'white', fontSize: '36px', textAlign: 'center' }}>Loading...</div>
      )}

      {isError && !isLoading && (
        <div style={{ color: 'white', fontSize: '36px', textAlign: 'center' }}>
          Error loading games
        </div>
      )}

      {!isLoading && !isError && games.length < gamesListLength && (
        <button className="AllGames_btnMore" onClick={handleLoadMore}>
          Show More
        </button>
      )}
    </section>
  );
};

export default Games;
