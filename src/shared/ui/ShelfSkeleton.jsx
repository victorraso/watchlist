const items = Array.from({ length: 20 }, (_, index) => (
  <div key={index} className="flex flex-col gap-1">
    <div className="relative aspect-2/3 max-w-38 overflow-hidden rounded-md bg-stone-800">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-stone-600/40 to-transparent"></div>
    </div>
    <div className="h-10 max-w-38 rounded-md"></div>
  </div>
));

export default function ShelfSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-black px-5 py-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
      {items}
    </div>
  );
}
