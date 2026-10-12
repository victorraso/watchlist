import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '../api/apiMovies';

export function useMovie(movieId) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId),
  });
}
