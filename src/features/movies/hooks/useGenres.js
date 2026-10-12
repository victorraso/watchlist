import { useQuery } from '@tanstack/react-query';
import { getMoviesGenres } from '../api/apiMovies';

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getMoviesGenres,
  });
}
