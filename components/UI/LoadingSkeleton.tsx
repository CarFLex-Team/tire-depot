export default function LoadingSkeleton({
  height = 6,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`h-${height} animate-pulse rounded-xl bg-brand-charcoal/60 ${className}`}
    />
  );
}
