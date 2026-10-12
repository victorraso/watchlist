import { Outlet } from 'react-router';
import Header from './Header';
import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';
import { useTrailer } from '../../features/movies/hooks/useTrailer';
import Modal from './Modal';

export default function AppLayout() {
  const { selectedMovie, setSelectedMovie } = useWatchlist();

  const { data: trailerObj, isLoading: isLoadingTrailer } = useTrailer(
    selectedMovie?.id,
  );

  const showTrailer = selectedMovie && !isLoadingTrailer;

  return (
    <div className="font-txt min-h-dvh bg-stone-950 p-1 text-stone-50">
      <Header />
      <main>
        <Outlet />
      </main>

      {showTrailer && (
        <Modal onClose={() => setSelectedMovie(null)}>
          <div
            className="flex h-fit w-fit items-center justify-center rounded-2xl bg-stone-900 p-5 lg:mb-30 lg:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {trailerObj ? (
              <iframe
                className="h-39.25 w-70 border-0 sm:h-78.75 sm:w-140 xl:h-157.5 xl:w-280"
                src={`https://www.youtube.com/embed/${trailerObj?.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="font-title text-lg text-stone-50">
                  Trailer for this movie is not available
                </span>
                <span className="text-5xl">🦖️</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
