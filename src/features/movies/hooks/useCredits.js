import { useQuery } from '@tanstack/react-query';
import { getMovieCredits } from '../api/apiMovies';

export function useCredits(movieId) {
  return useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => getMovieCredits(movieId),
  });
}
