export default function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-52 h-28 p-4 border border-brand-mid/20 bg-brand-charcoal/40 flex flex-col gap-2 relative overflow-hidden">
      <div className="h-3 w-12 bg-brand-mid/30 rounded-full animate-pulse" />
      <div className="h-3 w-36 bg-brand-mid/20 rounded-full animate-pulse" />
      <div className="h-3 w-28 bg-brand-mid/20 rounded-full animate-pulse" />
      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
