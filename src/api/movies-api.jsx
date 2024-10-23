import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODU1MGY1OWEwMjM3Y2VmYmE5Yjk3MWJlYjYyZTgxMiIsIm5iZiI6MTcyOTYyNDIxNy40NTIzNzQsInN1YiI6IjY3MTdmNTYwNWQwZGU4OTA0MmQ4OWI2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhK5i-wv20B601AYaX0nqsFeCBRTz92FDm92_Mx_03w',
    accept: 'application/json',
  },
};

export const fetchTrendingMovies = async () => {
  const {
    data: { results },
  } = await axios.get(baseUrl + '/trending/movie/day?language=en-US', options);
  return results;
};

export const fetchMovieDetails = async movie_id => {
  const { data } = await axios.get(baseUrl + `/movie/${movie_id}`, options);
  return data;
};

export const fetchMovieCredits = async movie_id => {
  const {
    data: { cast },
  } = await axios.get(baseUrl + `/movie/${movie_id}/credits`, options);
  return cast;
};

export const fetchMovieReviews = async movie_id => {
  const {
    data: { results },
  } = await axios.get(baseUrl + `/movie/${movie_id}/reviews`, options);
  return results;
};
