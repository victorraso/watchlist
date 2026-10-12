const items = Array.from({ length: 10 }, (_, index) => (
  <div key={index} className="min-h-26 min-w-68 rounded-md bg-stone-600/80">
    <div className="relative h-26 w-26 overflow-hidden rounded-md bg-stone-800">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-stone-600/40 to-transparent"></div>
    </div>
  </div>
));

export default function ProfileSkeleton() {
  return <div className="flex flex-row flex-wrap gap-2">{items}</div>;
}
