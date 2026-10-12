import { useQuery } from '@tanstack/react-query';
import { getUpcomingMovies } from '../api/apiMovies';

export function useUpcoming() {
  return useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  });
}
