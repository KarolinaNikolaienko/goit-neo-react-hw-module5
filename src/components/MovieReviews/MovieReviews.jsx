import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api/movies-api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        setMessage(false);
        const results = await fetchMovieReviews(movieId);
        if (!results || results.length === 0) setMessage(true);
        setReviews(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, [movieId]);

  return (
    <div className={css.reviews}>
      <h3>Reviews</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}
      {message && <p>We don&apos;t have any reviews for this movie</p>}
      {reviews && reviews.length !== 0 && (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li className={css.reviewsItem} key={review.id}>
              <p className={css.reviewsAuthor}>Author: {review.author}</p>
              <p className={css.reviewsText}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
