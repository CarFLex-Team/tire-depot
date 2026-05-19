"use client";
import { useCart } from "@/lib/cart";
import { Tire } from "@/lib/tires";
import { useState } from "react";
import Image from "next/image";

export default function TireCard({ tire }: { tire: Tire }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch({ type: "ADD", tire });
    dispatch({ type: "SET_OPEN", open: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const typeColors: Record<string, string> = {
    Passenger: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "All-Terrain": "text-green-400 bg-green-400/10 border-green-400/20",
    "Mud-Terrain": "text-orange-400 bg-orange-400/10 border-orange-400/20",
    Trailer: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "All-Season": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  };

  return (
    <div className="tire-card bg-brand-charcoal border border-brand-gray hover:border-brand-mid p-5 flex flex-col gap-4 rounded-2xl ">
      {/* Tire icon visual */}
      <div className="flex items-center justify-center h-28 bg-brand-dark border border-brand-gray">
        <Image src="/logo.png" alt="Tire Icon" width={96} height={96} />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-sm text-brand-red uppercase tracking-widest">
              {tire.brand}
            </p>
            {/* <h3 className="font-display font-semibold text-lg text-white leading-tight">
              {tire.model}
            </h3> */}
          </div>
        </div>

        <p className="font-display font-bold text-2xl text-brand-light tracking-wider">
          {tire.size}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`flex-shrink-0 text-xs font-display uppercase tracking-widest px-2 py-0.5 border rounded-full ${typeColors[tire.type]}`}
          >
            {tire.type}
          </span>
          <span
            className={`flex-shrink-0 text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 border rounded-full text-brand-muted border-brand-muted/20`}
          >
            {tire.diameter}&quot; rim
          </span>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-brand-gray">
          <div className="flex flex-col">
            <div>
              <span className="font-display font-semibold text-2xl text-white">
                ${tire.price.toLocaleString()}
              </span>
              <span className="font-display text-sm text-brand-muted ml-1">
                / {tire.priceType}
              </span>
            </div>
            {tire.priceType === "per set" && (
              <div>
                <span className="font-display font-semibold text-sm text-brand-muted">
                  ${(tire.price / 4).toLocaleString()}
                </span>
                <span className="font-display text-xs text-brand-muted ml-1">
                  / per tire
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-display font-bold text-green-400">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            IN STOCK
          </div>
        </div>
      </div>

      {/* <button
        onClick={handleAdd}
        className={`w-full py-2.5 font-display font-bold text-sm uppercase tracking-widest transition-all ${
          added
            ? "bg-green-500 text-white"
            : "bg-brand-red hover:bg-[#cc1215] text-white"
        }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button> */}
    </div>
  );
}
