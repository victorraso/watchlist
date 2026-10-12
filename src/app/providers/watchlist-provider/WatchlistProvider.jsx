import { useEffect, useState } from 'react';
import { WatchlistContext } from './WatchlistContext';
import { useGenres } from '../../../features/movies/hooks/useGenres';

export default function WatchlistProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movieList, setMovieList] = useState(() => {
    return JSON.parse(localStorage.getItem('watchList')) || [];
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedStars, setSelectedStars] = useState(null);

  const { data: genres, isLoading: isLoadingGenres } = useGenres();

  function handleMovieList(movie) {
    if (movieList.some((m) => m.id === movie.id)) {
      setMovieList(movieList.filter((m) => m.id !== movie.id));
    } else {
      setMovieList([...movieList, movie]);
    }
  }

  useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(movieList));
  }, [movieList]);

  const value = {
    selectedMovie,
    setSelectedMovie,
    selectedGenres,
    setSelectedGenres,
    selectedDecade,
    setSelectedDecade,
    selectedStars,
    setSelectedStars,
    handleMovieList,
    movieList,
    genres,
    isLoadingGenres,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}
