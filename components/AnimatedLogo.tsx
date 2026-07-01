import Image from "next/image";

export default function AnimatedLogo({
  size = 1,
  width = 10,
  height = 10,
  withText = true,
}: {
  size?: number;
  width?: number;
  height?: number;
  withText?: boolean;
}) {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <Image
        src="/logo.png"
        alt="logo"
        width={40}
        height={40}
        className={`animate-spinSlow w-${width} h-${height}`}
      />
      {withText && (
        <span
          className={`font-mono font-900 text-${size === 1 ? "xl" : "2xl"} tracking-widest text-white uppercase min-w-fit`}
        >
          Tire <span className="text-brand-red">Depot</span>
        </span>
      )}
    </a>
  );
}
