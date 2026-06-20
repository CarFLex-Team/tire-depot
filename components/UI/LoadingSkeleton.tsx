export default function LoadingSkeleton({ height = 6 }: { height: number }) {
  return (
    <div className={`h-${height} w-full animate-pulse rounded bg-brand-mid`} />
  );
}
