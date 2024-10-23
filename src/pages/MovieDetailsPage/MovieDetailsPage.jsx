import css from './MovieDetailsPage.module.css';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieDetails } from '../../api/movies-api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const backPath = useRef(location.state ?? '/');

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchMovieDetails(movieId);
        setDetails(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, [movieId]);

  return (
    <div>
      <button
        className={css.backBtn}
        onClick={() => navigate(backPath.current)}
      >
        Go back
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}
      {details && (
        <>
          <div className={css.detailsContainer}>
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt="Movie poster"
            />
            <div className={css.details}>
              <h1>{details.title}</h1>
              <p>Rating: {details.vote_average}</p>
              <h2>Overview</h2>
              <p>{details.overview}</p>
              <h2>Genres</h2>
              <div className={css.genres}>
                {details.genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
