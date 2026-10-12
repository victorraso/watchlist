import { useParams } from 'react-router';
import { useMovie } from '../hooks/useMovie';
import { useTrailer } from '../hooks/useTrailer';
import { useEffect, useState } from 'react';
import { useCredits } from '../hooks/useCredits';
import Profile from '../../../shared/ui/Profile';
import AddToListButton from '../../../shared/ui/AddToListButton';
import ProfileSkeleton from '../../../shared/ui/ProfileSkeleton';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [loadedProfileIds, setLoadedProfileIds] = useState([]);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);
  const [featuresPath, setFeaturesPath] = useState({
    backdrop: null,
    poster: null,
    trailer: null,
  });

  const { data: movieData, isLoading: isLoadingMovie } = useMovie(movieId);
  const { data: movieCredits, isLoading: isLoadingCredits } =
    useCredits(movieId);
  const { data: trailerObj, isLoading: isLoadingTrailer } = useTrailer(movieId);

  const cast = movieCredits?.cast
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  useEffect(() => {
    if (!movieData) return;

    const backdropPath = movieData?.backdrop_path;
    const posterPath = movieData?.poster_path;

    const backdropUrl = backdropPath
      ? `https://image.tmdb.org/t/p/w1280/${movieData?.backdrop_path}`
      : null;
    const posterUrl = posterPath
      ? `https://image.tmdb.org/t/p/w185/${movieData?.poster_path}`
      : null;

    const imagesToLoad = [];
    if (backdropUrl) imagesToLoad.push(backdropUrl);
    if (posterUrl) imagesToLoad.push(posterUrl);

    if (imagesToLoad.length === 0) {
      setFeaturesLoaded(true);
      setFeaturesPath({
        backdrop: null,
        poster: null,
      });
      return;
    }

    let count = 0;
    const totalImages = imagesToLoad.length;

    const checkLoad = () => {
      count++;
      if (count === totalImages) {
        setFeaturesLoaded(true);
        setFeaturesPath({
          backdrop: backdropUrl,
          poster: posterUrl,
        });
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    });
  }, [movieData]);

  useEffect(() => {
    document.title = movieData?.title || 'Movies Watchlist';
  }, [movieData]);

  function handleImageDone(id) {
    setLoadedProfileIds((prev) => {
      return [...prev, id];
    });
  }

  const loadedProfile = loadedProfileIds.length >= cast?.length;
  const isLoading = isLoadingMovie || isLoadingCredits || isLoadingTrailer;

  return (
    <div className="">
      {isLoading || !featuresLoaded ? (
        <div className="mt-50 flex h-full animate-pulse flex-col items-center justify-center">
          loading...
        </div>
      ) : (
        <div className="relative min-h-screen bg-stone-950">
          <div className="absolute inset-0 z-8">
            <img
              className="h-full w-full object-cover"
              src={featuresPath.backdrop}
            />
          </div>
          <div className="absolute inset-0 z-9 bg-linear-to-b from-stone-950/80 via-stone-950/50 to-stone-950"></div>
          {/* all containers */}
          <div className="relative z-10 m-auto flex max-w-300 flex-col gap-5 px-5 pt-20 text-shadow-sm text-shadow-stone-950 sm:pt-30 lg:m-0 lg:px-10">
            {/* top container */}
            <div className="flex flex-row items-start justify-between gap-5">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row gap-5">
                  {/* rating */}
                  <div className="flex flex-row items-center gap-1">
                    <svg
                      className="size-3 fill-yellow-500 sm:size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.8c.45 0 .86.26 1.06.67l2.2 4.45 4.91.71c.46.07.84.39.98.83.14.44.02.92-.31 1.24l-3.55 3.46.84 4.89c.08.46-.11.92-.49 1.2-.38.28-.87.32-1.29.1L12 18.04l-4.35 2.29c-.42.22-.91.18-1.29-.1-.38-.28-.57-.74-.49-1.2l.84-4.89-3.55-3.46c-.33-.32-.45-.8-.31-1.24.14-.44.52-.76.98-.83l4.91-.71 2.2-4.45c.2-.41.61-.67 1.06-.67Z" />
                    </svg>
                    <span className="text-xl text-yellow-500">
                      {movieData?.vote_average.toFixed(1) ?? '-'}
                    </span>
                  </div>
                  {/* popularity */}
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-shadow-none">❤️</span>
                    <span className="text-xl text-red-600">
                      {movieData?.popularity.toFixed(0) ?? '-'}
                    </span>
                  </div>
                  {/* runtime */}
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-shadow-none">⏳️</span>
                    <span className="text-xl text-blue-500">
                      {movieData?.runtime ?? '-'} min
                    </span>
                  </div>
                </div>
                {/* genres */}
                <div className="mb-5 flex flex-row items-center gap-2 text-nowrap">
                  {movieData?.genres.map((g) => (
                    <div
                      key={g.id}
                      className="w-fit rounded-md bg-orange-800/70 px-2 text-base"
                    >
                      <span>{g.name}</span>
                    </div>
                  ))}
                </div>
                {/* title */}
                <span className="font-txt text-4xl font-black">
                  {movieData?.title}
                </span>
                {/* overview */}
                <span className="">{movieData?.overview}</span>
                {/* credits crew */}
                <div className="mt-5">
                  <span className="text-lg font-black text-yellow-600">
                    Director:{' '}
                  </span>
                  <span>
                    {movieCredits?.crew.find((item) => item.job === 'Director')
                      ?.name ?? 'Unknown'}
                  </span>
                </div>
                {/* add to list btn */}
                <div>
                  <AddToListButton movie={movieData} />
                </div>
              </div>
              {/* poster img */}
              <div className="relative hidden sm:block">
                <img
                  className="aspect-2/3 max-w-70 rounded-xl shadow-2xl shadow-orange-600"
                  src={featuresPath.poster}
                />
                <div className="absolute top-0 left-0 h-full w-full bg-stone-950/20"></div>
              </div>
            </div>
            {/* middle container */}
            {/* trailer */}
            <h4 className="mt-5 text-2xl font-black sm:mt-10 md:text-3xl">
              Trailer
            </h4>
            <div className="">
              {trailerObj ? (
                <iframe
                  className="h-39.25 w-70 rounded-xl border-0 sm:h-78.75 sm:w-140"
                  src={`https://www.youtube.com/embed/${trailerObj?.key}`}
                  title={trailerObj?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <span className="font-title text-lg text-stone-50">
                    A Trailer for this movie is not available
                  </span>
                  <span className="text-5xl">🦖️</span>
                </div>
              )}
            </div>
            {/* bottom container */}
            {/* cast */}
            <h4 className="mt-10 text-2xl font-black md:text-3xl">Cast</h4>
            <div className="relative">
              <div
                className={`mb-30 flex flex-row flex-wrap gap-2 ${loadedProfile ? 'visible' : 'invisible'}`}
              >
                {cast?.map((c) => (
                  <Profile key={c.id} data={c} onImageDone={handleImageDone} />
                ))}
              </div>
              <div
                className={`absolute inset-0 ${!loadedProfile ? 'block' : 'hidden'}`}
              >
                <ProfileSkeleton />;
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
