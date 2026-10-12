import { useEffect, useState } from 'react';
import { useUpcoming } from '../hooks/useUpcoming';
import useWatchlist from '../../../app/providers/watchlist-provider/useWatchlist';
import PlayTrailerButton from '../../../shared/ui/PlayTrailerButton';
import AddToListButton from '../../../shared/ui/AddToListButton';

export default function UpcomingCarousel() {
  const [movieIndex, setMovieIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState({
    backdrop: null,
    poster: null,
  });
  const [prevBackdrop, setPrevBackdrop] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const { data: upcomingMovies, isLoading: isLoadingUpcoming } = useUpcoming();
  const { genres } = useWatchlist();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovieIndex(
        (index) => (index + 1) % Math.min(10, upcomingMovies?.length || 10),
      );
    }, 10000);
    return () => clearTimeout(timer);
  }, [movieIndex]);

  useEffect(() => {
    const path = upcomingMovies?.at(movieIndex)?.backdrop_path;
    const path2 = upcomingMovies?.at(movieIndex)?.poster_path;
    if (!path || !path2) return;

    const backdropSrc = `https://image.tmdb.org/t/p/w1280/${path}`;
    const posterSrc = `https://image.tmdb.org/t/p/w185/${path2}`;

    let count = 0;
    let cancelled = false;
    const checkAllLoaded = () => {
      count++;
      if (count === 2 && !cancelled) {
        setPrevBackdrop((current) => displayImages.backdrop ?? current);
        setDisplayIndex(movieIndex);
        setFadeIn(false);
        setDisplayImages({
          backdrop: backdropSrc,
          poster: posterSrc,
        });

        // rAF = run a callback before next repaint
        // with a double rAF we schedule a callback to run right after the browser's next repaint
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) setFadeIn(true);
          });
        });
      }
    };

    const img = new Image();
    img.src = backdropSrc;
    img.onload = checkAllLoaded;
    img.onerror = checkAllLoaded;

    const img2 = new Image();
    img2.src = posterSrc;
    img2.onload = checkAllLoaded;
    img2.onerror = checkAllLoaded;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      img2.onload = null;
      img2.onerror = null;
    };
  }, [movieIndex, upcomingMovies]);

  const genre =
    genres?.genres.find(
      (genre) => genre.id === upcomingMovies?.at(displayIndex)?.genre_ids[0],
    ) || '';

  const movie = upcomingMovies?.at(displayIndex);

  return (
    <>
      {!isLoadingUpcoming && (
        <div className="relative hidden sm:block">
          <div className="relative h-170 w-full overflow-hidden">
            {prevBackdrop ?? (
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={prevBackdrop}
              />
            )}
            {displayImages.backdrop && (
              <img
                key={displayImages.backdrop}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
                src={displayImages.backdrop}
              />
            )}
          </div>
          <div className="absolute top-0 left-0 h-172 w-full bg-linear-to-b from-stone-950 via-stone-950/20 to-stone-950"></div>
          <div className="absolute top-90 left-5 flex w-150 flex-row items-start gap-5 text-shadow-sm text-shadow-stone-950 md:left-20">
            <a href={`/movies/${movie.id}`}>
              <div className="h-50 w-30 shrink-0">
                <img
                  className="h-full w-full rounded-lg object-fill"
                  src={displayImages.poster}
                />
              </div>
            </a>
            <div className="flex flex-col">
              <div className="mb-2 w-fit rounded-md bg-orange-800/70 px-2 text-sm">
                <span>{genre.name}</span>
              </div>

              <span className="font-txt line-clamp-1 text-4xl font-black text-ellipsis">
                {upcomingMovies?.at(displayIndex)?.title}
              </span>
              <span className="font-txt mt-2 line-clamp-4 h-20 text-sm font-light text-ellipsis">
                {upcomingMovies?.at(displayIndex)?.overview}
              </span>
              <div className="mt-3 flex flex-row gap-2">
                <PlayTrailerButton movie={movie} />
                <AddToListButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
