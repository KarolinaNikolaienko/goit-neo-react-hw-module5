import { useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import { fetchSearchMovies } from '../../api/movies-api';
import { useLocation, useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const query = params.get('query') ?? '';

  const location = useLocation();

  const handleSearch = async e => {
    e.preventDefault();
    const queryValue = e.target.elements.query.value;
    try {
      setLoading(true);
      setError(false);

      if (!queryValue) {
        params.delete('query');
        setParams(params);
        return;
      }
      params.set('query', queryValue);
      setParams(params);

      const result = await fetchSearchMovies(queryValue);
      setMovies(result);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      if (query) {
        try {
          setLoading(true);
          setError(false);

          const result = await fetchSearchMovies(query);
          setMovies(result);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadMovies();
  }, [query]);

  return (
    <div>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          className={css.searchInput}
          type="text"
          name="query"
          defaultValue={query}
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}
      {movies && <MovieList movies={movies} location={location} />}
    </div>
  );
};

export default MoviesPage;
