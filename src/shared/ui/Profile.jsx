import { useEffect } from 'react';

export default function Profile({ data, onImageDone }) {
  return (
    <div className="flex h-26 w-68 shrink-0 flex-row gap-2 rounded-md bg-orange-600/30 text-sm text-shadow-none">
      <div className="shrink-0">
        {data?.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185/${data?.profile_path}`}
            className="aspect-square h-26 w-26 rounded-tl-md rounded-bl-md object-cover"
            onLoad={() => onImageDone?.(data.id)}
            onError={() => onImageDone?.(data.id)}
          />
        ) : (
          <img
            src="/profile-null.png"
            className="aspect-square h-26 w-26 rounded-tl-md rounded-bl-md object-cover"
            onLoad={() => onImageDone?.(Math.random())}
            onError={() => onImageDone?.(Math.random())}
          />
        )}
      </div>
      <div className="flex flex-col items-start justify-center p-1">
        <span className="mb-2 font-black">{data.name}</span>
        <span className="text-xs italic">as</span>
        <span className="line-clamp-2 text-ellipsis text-yellow-400">
          {data.character}
        </span>
      </div>
    </div>
  );
}
