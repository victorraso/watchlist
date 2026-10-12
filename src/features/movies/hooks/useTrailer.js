import { useQuery } from '@tanstack/react-query';
import { getTrailer } from '../api/apiMovies';

export function useTrailer(movieId) {
  return useQuery({
    queryKey: ['trailer', movieId],
    queryFn: () => getTrailer(movieId),
    enabled: !!movieId,
  });
}
