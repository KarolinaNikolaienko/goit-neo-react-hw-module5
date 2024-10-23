import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../../api/movies-api';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchMovieCredits(movieId);
        setCast(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, [movieId]);

  return (
    <div className={css.cast}>
      <h3>Cast</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}
      {cast && (
        <ul className={css.castList}>
          {cast.map(actor => (
            <li className={css.castItem} key={actor.id}>
              <img
                className={css.castImage}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt="Actor's picture"
                height="150px"
                width="100px"
              />
              <p className={css.castInfo}>{actor.name}</p>
              <p className={css.castInfo}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
