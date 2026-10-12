import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/apiMovies';

export function usePopular(page) {
  return useQuery({
    queryKey: ['popular', page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });
}
