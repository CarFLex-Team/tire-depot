"use client";

import { useCart } from "@/lib/cart";
import { Tire } from "@/lib/api/tires";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Tag,
  Layers,
  Gauge,
  Wind,
  Ruler,
  Truck,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ZoomImage from "./UI/ZoomImage";
import { getLoadCapacity, getSpeedRating } from "@/lib/getSpeedRating";
import LoadingSkeleton from "./UI/LoadingSkeleton";

interface Props {
  tire: Tire | null;
  loading: boolean;
  error: boolean;
  onBack: () => void;
}

function SpecBadge({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 bg-brand-charcoal border border-brand-mid/30 rounded-xl px-5 py-4">
      <div className="flex items-center gap-2 text-brand-muted font-display text-xs uppercase tracking-widest">
        {icon}
        {label}
      </div>
      <span className="font-display text-white text-xl font-bold">{value}</span>
    </div>
  );
}

export default function TireDetailSection({
  tire,
  loading,
  error,
  onBack,
}: Props) {
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 sm:px-10">
        <p className="font-display text-brand-red text-2xl uppercase tracking-widest">
          Tire not found
        </p>
        <p className="font-body text-brand-muted">
          This tire may no longer be in our inventory.
        </p>
        <button
          onClick={onBack}
          className="mt-2 flex items-center gap-2 text-sm font-display text-brand-red hover:underline uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to shop
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-display uppercase tracking-widest text-brand-muted hover:text-brand-red transition-colors mb-10"
      >
        <ArrowLeft size={15} /> Back to results
      </button>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <LoadingSkeleton className="aspect-square w-full" />
          <div className="flex flex-col gap-5">
            <LoadingSkeleton className="h-5 w-28" />
            <LoadingSkeleton className="h-10 w-3/4" />
            <LoadingSkeleton className="h-6 w-24" />
            <LoadingSkeleton className="h-px w-full" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-20" />
              ))}
            </div>
            <LoadingSkeleton className="h-14 w-full mt-4" />
          </div>
        </div>
      ) : tire ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative">
            {tire.imageUrl ? (
              <ZoomImage
                src={tire.imageUrl}
                alt={`${tire.brand} ${tire.model}`}
              />
            ) : (
              <div className="flex items-center justify-center aspect-square w-full rounded-2xl overflow-hidden bg-brand-charcoal border border-brand-mid/20">
                <Image
                  src={"/logo.png"}
                  alt="Tire Icon"
                  width={120}
                  height={120}
                  className="object-contain h-full "
                />
              </div>
            )}

            <div
              className={`absolute top-4 right-4 flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                tire.inStock
                  ? "bg-emerald-950/80 border-emerald-700 text-emerald-400"
                  : "bg-red-950/80 border-red-800 text-brand-red"
              }`}
            >
              {tire.inStock ? (
                <>
                  <CheckCircle2 size={13} /> In Stock
                </>
              ) : (
                <>
                  <XCircle size={13} /> Out of Stock
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="font-display text-brand-red tracking-widest uppercase text-2xl mb-1">
                {tire.brand}
              </p>
              <h1 className="font-mono text-3xl sm:text-4xl text-white uppercase leading-tight">
                {tire.model}
              </h1>
              {tire.terrain && (
                <span className="inline-block mt-2 font-display text-xs uppercase tracking-widest text-brand-muted border border-brand-mid/40 rounded-full px-3 py-1">
                  {tire.terrain}
                </span>
              )}
            </div>

            <p className="font-mono text-brand-muted text-2xl sm:text-4xl tracking-widest">
              {tire.width}/{tire.aspectRatio}R{tire.diameter}
            </p>

            <hr className="border-brand-charcoal" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SpecBadge
                label="Load Index"
                value={`${tire.LoadIndex} ${getLoadCapacity(tire.LoadIndex) ? `(${getLoadCapacity(tire.LoadIndex)} IBS)` : "N/A"}`}
                icon={<Layers size={12} />}
              />
              <SpecBadge
                label="Speed Rating"
                value={`${tire.speedRating} ${getSpeedRating(tire.speedRating) ? `(${getSpeedRating(tire.speedRating)?.maxSpeedMph} MPH)` : "N/A"}`}
                icon={<Gauge size={12} />}
              />
              <SpecBadge
                label="Diameter"
                value={`${tire.diameter}"`}
                icon={<Ruler size={12} />}
              />
              <SpecBadge
                label="Width"
                value={`${tire.width}mm`}
                icon={<Wind size={12} />}
              />
              <SpecBadge
                label="Ratio"
                value={`${tire.aspectRatio}%`}
                icon={<Layers size={12} />}
              />
              {tire.class && (
                <SpecBadge
                  label="Class"
                  value={tire.class}
                  icon={<Tag size={12} />}
                />
              )}
            </div>

            <hr className="border-brand-charcoal" />

            <div>
              <div className="flex items-end gap-3 mb-2">
                <span className="font-display text-5xl font-bold text-white">
                  ${tire.price.toFixed(2)}
                </span>
                <span className="font-body text-brand-muted mb-1 text-sm">
                  per tire
                </span>
              </div>
              <div>
                <span className="font-body text-brand-muted text-sm flex items-center gap-1">
                  <Truck size={16} /> Free shipping
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((prev) => Math.max(prev - 1, 1))}
                  className="w-8 h-8 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono text-sm text-white w-4 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="w-8 h-8 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "ADD", tire, qty });
                  dispatch({ type: "SET_OPEN", open: true });
                }}
                disabled={!tire.inStock}
                className={`flex-1 py-4 font-display font-bold uppercase tracking-widest text-sm rounded-xl transition-all ${
                  tire.inStock
                    ? "bg-brand-red text-white hover:bg-brand-red/90 active:scale-95"
                    : "bg-brand-charcoal text-brand-muted cursor-not-allowed"
                }`}
              >
                {tire.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
