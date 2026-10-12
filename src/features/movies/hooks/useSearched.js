import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getSearchedMovie } from '../api/apiMovies';

export function useSearched(query, page) {
  return useQuery({
    queryKey: ['searched', query, page],
    queryFn: () => getSearchedMovie(query, page),
    placeholderData: keepPreviousData,
  });
}
