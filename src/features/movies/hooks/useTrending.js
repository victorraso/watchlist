import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies } from '../api/apiMovies';

export function useTrending() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  });
}
