import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTopRatedMovies } from '../api/apiMovies';

export function useTopRated(page) {
  return useQuery({
    queryKey: ['top-rated', page],
    queryFn: () => getTopRatedMovies(page),
    placeholderData: keepPreviousData,
  });
}
