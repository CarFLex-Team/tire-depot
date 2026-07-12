import { Address } from "@/lib/api/addresses";
import { CheckCircle2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SkeletonCard from "./SkeletonCards";
export default function AddressPicker({
  addresses,
  selectedId,
  onSelect,
  onAddAddress,
  isLoading,
}: {
  addresses: Address[];
  selectedId: string | null;
  onSelect: (a: Address) => void;
  onAddAddress: () => void;
  isLoading: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [addresses, isLoading]);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative -mx-6">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full flex items-center justify-center bg-gradient-to-r from-brand-dark to-transparent text-brand-muted hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full flex items-center justify-center bg-gradient-to-l from-brand-dark to-transparent text-brand-muted hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Scroll container — no scrollbar */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-6 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        onScroll={updateArrows}
      >
        {isLoading ? (
          <>
            {[1, 2, 3].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </>
        ) : (
          <>
            {addresses.map((a, i) => {
              const isSelected = (selectedId ?? addresses[0]?.id) === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onSelect(a)}
                  className={`flex-shrink-0 w-52 text-left p-4 border transition-all flex flex-col gap-1 relative ${
                    isSelected
                      ? "border-brand-red bg-brand-red/5"
                      : "border-brand-mid/40 bg-brand-dark hover:border-brand-mid"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {a.label && (
                      <span className="font-display text-xs uppercase tracking-widest text-brand-red border border-brand-red/40 rounded-full px-2 py-0.5">
                        {a.label}
                      </span>
                    )}
                    {i === 0 && (
                      <span className="font-display text-xs uppercase tracking-widest text-brand-muted">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="font-body text-white text-sm leading-snug">
                    {a.line1}
                    {a.line2 ? `, ${a.line2}` : ""}
                  </p>
                  <p className="font-body text-brand-muted text-xs">
                    {a.city}, {a.state} {a.postal_code}
                  </p>
                  {isSelected && (
                    <CheckCircle2
                      size={15}
                      className="text-brand-red absolute top-3 right-3"
                    />
                  )}
                </button>
              );
            })}

            {/* Add address card */}
            <button
              type="button"
              onClick={onAddAddress}
              className="flex-shrink-0 w-52 p-4 border border-dashed border-brand-mid/40 bg-brand-dark hover:border-brand-red hover:text-brand-red text-brand-muted transition-all flex flex-col items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span className="font-display text-xs uppercase tracking-widest">
                Add Address
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
