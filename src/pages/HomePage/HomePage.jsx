import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/movies-api';
import MovieList from '../../components/MovieList/MovieList';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.trandingMoviesSection}>
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}

      {movies && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} location={location} />
        </>
      )}
    </div>
  );
};

export default HomePage;
