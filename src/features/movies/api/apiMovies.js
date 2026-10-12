import { getToday } from '../../../shared/utils/dateUtils';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

const today = getToday();
// const today = new Date().toISOString().split('T')[0];
// const [year, month, day] = today.split('-').map(Number);
// const aMonthAgo = new Date(year, month - 2, day).toISOString().split('T')[0];

export async function getSearchedMovie(query, page) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      getOptions,
    );

    if (!res.ok) {
      throw new Error(`Failed to get searched movie: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getSearchedMovies fetch error:', error);
  }
}

export async function getFilteredMovies(page, genres, decade, stars) {
  const decadeStart = decade ? `${decade}-01-01` : null;
  const decadeEnd = decade ? `${Number(decade) + 9}-12-31` : null;
  let starsFilter = stars
    ? `&vote_average.gte=${Number(stars) > 0 ? stars : 0}&vote_average.lte=${Number(stars) > 0 ? 10 : 0}`
    : '';

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US${starsFilter}&page=${page}&primary_release_date.gte=${decadeStart}&primary_release_date.lte=${decadeEnd}&sort_by=popularity.desc&with_genres=${genres}`,
      getOptions,
    );

    if (!res.ok)
      throw new Error(`Failed to get filtered movies: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getFilteredMovies fetch error:', error);
  }
}

export async function getTrendingMovies() {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      getOptions,
    );

    if (!res.ok)
      throw new Error(`Failed to get trending movies: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getTrendingMovies fetch error:', error);
  }
}

export async function getMoviesGenres() {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      getOptions,
    );

    if (!res.ok) throw new Error(`Failed to get movies genres: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getMoviesGenres fetch error:', error);
  }
}

export async function getTrailer(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      getOptions,
    );

    if (!res.ok) throw new Error(`Failed to get movie trailer: ${res.status}`);

    const data = await res.json();

    const findGoodTrailer = (type, official) =>
      data?.results
        .filter((item) => {
          const matchesType = type ? item.type === type : true;
          return (
            matchesType && item.official === official && item.site === 'YouTube'
          );
        })
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))[0];

    return (
      findGoodTrailer('Trailer', true) ||
      findGoodTrailer('Trailer', false) ||
      findGoodTrailer(null, true) ||
      findGoodTrailer(null, false) ||
      null
    );
  } catch (error) {
    console.error('getTrailer fetch error:', error);
    throw error;
  }
}

export async function getMovieById(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      getOptions,
    );

    if (!res.ok) throw new Error(`Failed to get movie: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getMovieById fetch error:', error);
  }
}

export async function getMovieCredits(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      getOptions,
    );

    if (!res.ok) throw new Error(`Failed to get movie credits: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getMovieCredits fetch error:', error);
  }
}

export async function getUpcomingMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc`,
      getOptions,
    );

    if (!res.ok)
      throw new Error(`Failed to get upcoming movies: ${res.status}`);

    const data = await res.json();

    const filteredData = data.results.filter(
      (item) => item.backdrop_path !== null,
    );
    return filteredData;
  } catch (error) {
    console.error('getUpcomingMovies fetch error:', error);
  }
}

export async function getTopRatedMovies(page) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      getOptions,
    );

    if (!res.ok)
      throw new Error(`Failed to get top rated movies: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getTopRatedMovies fetch error:', error);
  }
}

export async function getPopularMovies(page) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      getOptions,
    );

    if (!res.ok) throw new Error(`Failed to get popular movies: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('getPopularMovies fetch error:', error);
  }
}
