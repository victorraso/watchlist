import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFilteredMovies } from '../api/apiMovies';

export function useFiltered(page, genres, decade, stars) {
  return useQuery({
    queryKey: ['filtered', page, genres, decade, stars],
    queryFn: () => getFilteredMovies(page, genres, decade, stars),
    placeholderData: keepPreviousData,
  });
}
