import { useEffect, useState } from 'react';
import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';
import Poster from './Poster';
import ShelfSkeleton from './ShelfSkeleton';

export default function Shelf({
  data,
  isLoadingData,
  isFetchingData = false,
  title = '',
  seePages = false,
  page,
  setPage,
}) {
  const { genres, isLoadingGenres } = useWatchlist();

  const isLoading = isLoadingGenres && isLoadingData;

  const sortedMovies = [...(data?.results || [])]
    .filter((item) => item.poster_path)
    .sort((a, b) => b.popularity - a.popularity);

  const [loadedIds, setLoadedIds] = useState([]);
  const moviesCount = sortedMovies.length;
  // const isAllLoaded = moviesCount > 0 && loadedIds.length >= moviesCount;
  const isAllLoaded =
    moviesCount > 0 && sortedMovies.every((m) => loadedIds.includes(m.id));

  useEffect(() => {
    setLoadedIds([]);
  }, [page]);

  function handleImageDone(id) {
    setLoadedIds((prev) => {
      return [...prev, id];
    });
  }

  return (
    <div className="mt-0 sm:px-2">
      <div className="flex flex-row items-center">
        {title && (
          <h4
            className={`${seePages && 'mr-10'} flex flex-row items-center gap-1`}
          >
            <span className="mb-1 text-xs sm:text-sm">✴️</span>
            <span className="font-title text-md font-light italic sm:text-2xl">
              {title}
            </span>
          </h4>
        )}
        {seePages && (
          <div className="font-title mb-1 ml-1 flex flex-row items-center gap-3 font-light">
            <button
              className="cursor-pointer text-2xl font-medium text-orange-400"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              {'<'}
            </button>
            <span className="font-txt text-2xl text-orange-600">
              {String(page).padStart(2, 0)}
            </span>
            <button
              className="cursor-pointer text-2xl font-medium text-orange-400"
              onClick={() => {
                if (page >= 1 && page < data?.total_pages) {
                  setPage(page + 1);
                }
              }}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        {isLoading ||
          isFetchingData ||
          (!isAllLoaded && (
            <div className="absolute inset-0 z-10">
              <ShelfSkeleton />
            </div>
          ))}
        <div
          className={
            isLoading || isFetchingData || !isAllLoaded
              ? 'invisible'
              : 'visible'
          }
        >
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-black px-5 py-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
            {sortedMovies.map((item) => {
              const genre =
                genres?.genres.find(
                  (genre) => genre.id === item.genre_ids[0],
                ) || '';
              return (
                <Poster
                  key={item.id}
                  movie={item}
                  genre={genre?.name}
                  onImageDone={handleImageDone}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
