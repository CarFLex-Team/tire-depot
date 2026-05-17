export default function AnimatedLogo() {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <img src="/logo.png" alt="logo" className="animate-spinSlow w-10 h-10" />
      <span className="font-mono font-900 text-xl tracking-widest text-white uppercase">
        Tire <span className="text-brand-red">Depot</span>
      </span>
    </a>
  );
}
