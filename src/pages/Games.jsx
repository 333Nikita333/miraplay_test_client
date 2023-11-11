import { useEffect, useState } from 'react';
import { useGames } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { clearGames, setGames } from '../redux/gamesSlice/gamesSlice';

const Games = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.games);
  const gamesListLength = useSelector(state => state.games.gamesListLength);

  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('ALL');

  const { data, isLoading, isError } = useGames(page, genre);

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

  return (
    <div>
      <h1>Games</h1>
      <div>
        <select value={genre} onChange={e => handleGenreChange(e.target.value)}>
          <option value="ALL">All</option>
          <option value="FREE">Free</option>
          {/* Другие варианты жанров */}
        </select>
      </div>
      {isLoading && games.length === 0 ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading games</div>
      ) : (
        <div>
          {games.map(game => (
            <div key={game._id}>
              <h2>{game.commonGameName}</h2>
              <p>{game.gameDescription}</p>
              <img src={game.gameImage} alt={game.commonGameName} />
              {/* Остальная информация о игре */}
            </div>
          ))}
          {games.length < gamesListLength && <button onClick={handleLoadMore}>Show More</button>}
        </div>
      )}
    </div>
  );
};

export default Games;
