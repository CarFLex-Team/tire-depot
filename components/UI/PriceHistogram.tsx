import { Tire } from "@/lib/tires";
import { useMemo } from "react";

export function PriceHistogram({
  tires,
  minPct,
  maxPct,
  absoluteMin,
  absoluteMax,
  onMinChange,
  onMaxChange,
}: {
  tires: Tire[];
  minPct: number;
  maxPct: number;
  absoluteMin: number;
  absoluteMax: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}) {
  const BAR_COUNT = 28;

  const bars = useMemo(() => {
    if (tires.length === 0) return Array(BAR_COUNT).fill(0);
    const range = absoluteMax - absoluteMin || 1;
    const buckets = Array(BAR_COUNT).fill(0);
    tires.forEach((t) => {
      const idx = Math.min(
        BAR_COUNT - 1,
        Math.floor(((t.price - absoluteMin) / range) * BAR_COUNT),
      );
      buckets[idx]++;
    });
    return buckets;
  }, [tires, absoluteMin, absoluteMax]);

  const maxBar = Math.max(...bars, 1);

  const priceMin = Math.round(
    absoluteMin + (minPct / 100) * (absoluteMax - absoluteMin),
  );
  const priceMax = Math.round(
    absoluteMin + (maxPct / 100) * (absoluteMax - absoluteMin),
  );

  return (
    <div>
      {/* Histogram bars */}
      <div className="flex items-end gap-[2px] h-16 mb-2">
        {bars.map((count, i) => {
          const pos = (i / BAR_COUNT) * 100;
          const dimmed = pos < minPct || pos > maxPct;
          return (
            <div
              key={i}
              className={`flex-1 rounded-t transition-opacity duration-150 ${
                dimmed ? "bg-brand-mid opacity-25" : "bg-brand-red opacity-80"
              }`}
              style={{ height: `${Math.max(4, (count / maxBar) * 100)}%` }}
            />
          );
        })}
      </div>

      {/* Dual range slider */}
      <div className="relative h-5 mt-1">
        {/* Track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-brand-mid rounded-full" />
        {/* Fill */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-brand-red rounded-full"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={minPct}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v < maxPct - 2) onMinChange(v);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-20
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[18px]
            [&::-webkit-slider-thumb]:h-[18px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-brand-red
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-brand-dark
            [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_theme(colors.brand.red)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-[18px]
            [&::-moz-range-thumb]:h-[18px]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-brand-red
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-brand-dark
            [&::-moz-range-thumb]:cursor-pointer
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:bg-transparent
            [&::-webkit-slider-thumb]:pointer-events-auto"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={maxPct}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v > minPct + 2) onMaxChange(v);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-30
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[18px]
            [&::-webkit-slider-thumb]:h-[18px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-brand-red
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-brand-dark
            [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_theme(colors.brand.red)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-[18px]
            [&::-moz-range-thumb]:h-[18px]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-brand-red
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-brand-dark
            [&::-moz-range-thumb]:cursor-pointer
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-moz-range-track]:bg-transparent"
        />
      </div>

      {/* Price labels */}
      <div className="flex justify-between mt-2">
        <span className="font-display font-semibold text-sm text-brand-light">
          ${priceMin.toLocaleString()}
        </span>
        <span className="font-display font-semibold text-sm text-brand-light">
          ${priceMax.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
