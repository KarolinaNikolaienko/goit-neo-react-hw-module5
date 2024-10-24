import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, location }) => {
  return (
    <div>
      <ul className={css.movieList}>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link className={css.link} to={`/movies/${id}`} state={location}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
