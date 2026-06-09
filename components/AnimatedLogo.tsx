import Image from "next/image";

export default function AnimatedLogo({ size = 1 }: { size?: number }) {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <Image
        src="/logo.png"
        alt="logo"
        width={40}
        height={40}
        className="animate-spinSlow w-10 h-10"
      />
      <span
        className={`font-mono font-900 text-${size === 1 ? "xl" : "2xl"} tracking-widest text-white uppercase`}
      >
        Tire <span className="text-brand-red">Depot</span>
      </span>
    </a>
  );
}
