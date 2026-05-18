import CountUp from "../CountUp";

export default function StatsCard({
  stat,
}: {
  stat: { value: number; label: string; sign: string };
}) {
  return (
    <div
      className={`bg-brand-gray h-full py-6 flex flex-col items-center justify-center text-center rounded-3xl border border-brand-gray hover:border-brand-red/30 hover:-translate-y-1 transition-all `}
    >
      <span className="font-mono  text-4xl text-white mb-3">
        <CountUp target={stat.value} />
        <span className="font-display font-bold text-brand-red text-3xl">
          {stat.sign}
        </span>
      </span>
      <span className="font-display text-brand-muted uppercase tracking-widest">
        {stat.label}
      </span>
    </div>
  );
}
