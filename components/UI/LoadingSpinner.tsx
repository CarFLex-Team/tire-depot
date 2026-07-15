export default function LoadingSpinner({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={` border-4 border-white border-t-brand-red rounded-full animate-spin ${width ? `w-${width}` : "w-4"} ${height ? `h-${height}` : "h-4"}`}
    ></div>
  );
}
