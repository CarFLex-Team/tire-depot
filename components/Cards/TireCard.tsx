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
    <div className="tire-card bg-brand-charcoal border border-brand-gray hover:border-brand-mid p-5 flex flex-col sm:flex-row gap-4 rounded-2xl ">
      {/* Tire icon visual */}
      <div className="flex items-center justify-center h-1/3 w-full sm:h-64 sm:w-1/3  bg-white border border-brand-gray">
        {tire.imageUrl?.endsWith(".png") || tire.imageUrl?.endsWith(".jpg") ? (
          <Image
            src={tire.imageUrl}
            alt="Tire Icon"
            width={256}
            height={256}
            className={`object-contain h-full ${tire.imageUrl?.endsWith(".png") ? "hover:scale-110 transition-transform" : ""}`}
          />
        ) : (
          <Image
            src={"/logo.png"}
            alt="Tire Icon"
            width={120}
            height={120}
            className="object-contain h-full"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div className="flex items-start justify-between gap-2 ">
          <div>
            <p className="font-display text-3xl text-brand-red uppercase ">
              {tire.brand}
            </p>
            <h3 className="font-display font-semibold text-lg text-brand-muted leading-tight">
              {tire.model}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-semibold text-xl text-brand-light tracking-wider">
            {tire.size} {tire.LoadIndex ? `${tire.LoadIndex}` : ""}
            {tire.speedRating ? `${tire.speedRating}` : ""}
          </p>
          <div className="flex items-center gap-1 text-xs font-display font-semibold text-green-400 whitespace-nowrap shrink-0">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            IN STOCK
          </div>
        </div>
        <div className="border-brand-gray border-t pt-4  flex items-center gap-1">
          <span className="font-display font-semibold text-4xl text-white">
            ${tire.price.toLocaleString()}
          </span>
          <span className="font-display text-sm text-brand-muted ml-1">
            /tire
          </span>
        </div>
        <div className="border-brand-gray border-t pt-4 flex flex-col  gap-1">
          {tire.terrain && (
            <div className="flex justify-between">
              <p className="font-display  text-lg text-white ">Category:</p>
              <p className="font-display  text-base text-brand-muted ">
                {tire.terrain}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="font-display  text-lg text-white ">Vehicle:</p>
            <p className="font-display  text-base text-brand-muted ">
              {tire.class}
            </p>
          </div>
        </div>

        <div className="flex  justify-between  pt-4 border-t border-brand-gray">
          <button>{/* Specs button */}</button>
          <button
            onClick={handleAdd}
            className={`w-32 py-2 font-display font-bold text-sm uppercase tracking-widest transition-all rounded-full ${
              added
                ? "bg-green-500 text-white"
                : "bg-brand-red hover:bg-brand-red/90 text-white"
            }`}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* <button
        onClick={handleAdd}
        className={`w-full py-2.5 font-display font-bold text-sm uppercase tracking-widest transition-all rounded-full ${
          added
            ? "bg-green-500 text-white"
            : "bg-brand-red hover:bg-brand-red/90 text-white"
        }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button> */}
    </div>
  );
}
