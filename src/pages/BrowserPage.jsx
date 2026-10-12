import { useEffect, useState } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import { useFiltered } from '../features/movies/hooks/useFiltered';
import FiltersBar from '../shared/ui/FiltersBar';
import useWatchlist from '../app/providers/watchlist-provider/useWatchlist';
import { useSearched } from '../features/movies/hooks/useSearched';
import Shelf from '../shared/ui/Shelf';

export default function BrowserPage() {
  useEffect(() => {
    document.title = 'Movies Watchlist';
  }, []);

  const [pageFiltered, setPageFiltered] = useState(1);
  const [pageSearched, setPageSearched] = useState(1);
  const [query, setQuery] = useState('');
  const { isLoadingGenres, selectedGenres, selectedDecade, selectedStars } =
    useWatchlist();

  const { data: filteredMovies, isLoading: isLoadingFiltered } = useFiltered(
    pageFiltered,
    selectedGenres.join(','),
    selectedDecade,
    selectedStars,
  );

  const { data: searchedMovie, isLoading: isLoadingSearchedMovie } =
    useSearched(query, pageSearched);

  return (
    <div className="relative">
      <div className="fixed inset-0 z-10">
        <img src="./background.png" className="h-full w-full object-cover" />
        <div className="absolute inset-0 z-20 bg-linear-to-b from-stone-950/50 via-stone-950/20 to-stone-950"></div>
      </div>
      {isLoadingGenres ? (
        <div className="relative z-50 flex animate-pulse flex-col items-center pt-20 text-stone-50 sm:pt-30">
          loading...
        </div>
      ) : (
        <>
          <div className="relative z-50 flex flex-col items-center pt-20 sm:pt-30">
            <div className="w-70 sm:w-120">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
          </div>
          <div className="relative z-50 px-5">{!query && <FiltersBar />}</div>
          <div className="relative z-50 mt-6 pb-10">
            {query ? (
              <Shelf
                data={searchedMovie}
                isLoadingData={isLoadingSearchedMovie}
                seePages={true}
                page={pageSearched}
                setPage={setPageSearched}
              />
            ) : (
              <Shelf
                data={filteredMovies}
                isLoadingData={isLoadingFiltered}
                seePages={true}
                page={pageFiltered}
                setPage={setPageFiltered}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
