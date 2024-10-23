import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api/movies-api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchMovieReviews(movieId);
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
      {console.log(reviews)}
      {loading && <p>Loading...</p>}
      {error && <p>Something gone wrong</p>}
      {reviews ? (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li className={css.reviewsItem} key={review.id}>
              <p className={css.reviewsAuthor}>Author: {review.author}</p>
              <p className={css.reviewsText}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
