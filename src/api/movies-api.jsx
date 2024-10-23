import axios from 'axios';

const url = 'https://api.themoviedb.org/3/search/movie';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODU1MGY1OWEwMjM3Y2VmYmE5Yjk3MWJlYjYyZTgxMiIsIm5iZiI6MTcyOTYyNDIxNy40NTIzNzQsInN1YiI6IjY3MTdmNTYwNWQwZGU4OTA0MmQ4OWI2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhK5i-wv20B601AYaX0nqsFeCBRTz92FDm92_Mx_03w',
  },
};

export const fetchMovies = async () => {
  return await axios.get(url, options);
};
