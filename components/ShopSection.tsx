"use client";
import { useState, useMemo } from "react";
import { TIRES, BRANDS, TYPES, DIAMETERS, type Tire } from "@/lib/tires";
import { useCart } from "@/lib/cart";

function TireCard({ tire }: { tire: Tire }) {
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
    <div className="tire-card bg-brand-charcoal border border-brand-gray hover:border-brand-mid p-5 flex flex-col gap-4">
      {/* Tire icon visual */}
      <div className="flex items-center justify-center h-28 bg-brand-dark border border-brand-gray">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="34" stroke="#2A2A2A" strokeWidth="10" />
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#E8161A"
            strokeWidth="10"
            strokeDasharray="30 10"
            strokeDashoffset="5"
          />
          <circle cx="40" cy="40" r="15" fill="#1C1C1C" />
          <circle cx="40" cy="40" r="8" fill="#2A2A2A" />
          <circle cx="40" cy="40" r="4" fill="#E8161A" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {tire.brand}
            </p>
            <h3 className="font-display font-bold text-lg text-white leading-tight">
              {tire.model}
            </h3>
          </div>
          <span
            className={`flex-shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${typeColors[tire.type]}`}
          >
            {tire.type}
          </span>
        </div>

        <p className="font-mono text-sm text-brand-light tracking-wider">
          {tire.size}
        </p>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-brand-gray">
          <div>
            <span className="font-display font-black text-2xl text-white">
              ${tire.price.toLocaleString()}
            </span>
            <span className="font-mono text-xs text-brand-muted ml-1">
              / {tire.priceType}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-green-400">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            IN STOCK
          </div>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`w-full py-2.5 font-display font-bold text-sm uppercase tracking-widest transition-all ${
          added
            ? "bg-green-500 text-white"
            : "bg-brand-red hover:bg-[#cc1215] text-white"
        }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </div>
  );
}

export default function ShopSection() {
  const [filterType, setFilterType] = useState("All Types");
  const [filterDiameter, setFilterDiameter] = useState("All Sizes");
  const [filterBrand, setFilterBrand] = useState("All Brands");
  const [sort, setSort] = useState("Price: Low → High");

  const filtered = useMemo(() => {
    let tires = [...TIRES];

    if (filterType !== "All Types")
      tires = tires.filter((t) => t.type === filterType);
    if (filterDiameter !== "All Sizes")
      tires = tires.filter((t) => t.diameter === parseInt(filterDiameter));
    if (filterBrand !== "All Brands")
      tires = tires.filter((t) => t.brand === filterBrand);

    tires.sort((a, b) => {
      if (sort === "Price: Low → High") return a.price - b.price;
      if (sort === "Price: High → Low") return b.price - a.price;
      if (sort === "Size: Small → Large") return a.diameter - b.diameter;
      if (sort === "Size: Large → Small") return b.diameter - a.diameter;
      if (sort === "Brand: A → Z") return a.brand.localeCompare(b.brand);
      return 0;
    });

    return tires;
  }, [filterType, filterDiameter, filterBrand, sort]);

  const reset = () => {
    setFilterType("All Types");
    setFilterDiameter("All Sizes");
    setFilterBrand("All Brands");
    setSort("Price: Low → High");
  };

  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-sm font-body px-3 py-2 pr-8 focus:outline-none focus:border-brand-red transition-colors cursor-pointer";

  return (
    <section id="shop" className="bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs text-brand-red tracking-widest uppercase mb-2">
              Our Inventory
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              Shop Tires
            </h2>
            <p className="font-body text-brand-muted mt-2">
              Browse our real-time inventory — all prices shown per set unless
              noted
            </p>
          </div>
          <div className="font-mono text-xs text-brand-muted uppercase tracking-widest">
            Showing {filtered.length} tires · In-Store Pickup Only
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-brand-gray">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Category
            </label>
            <select
              className={selectClass}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>All Types</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Diameter
            </label>
            <select
              className={selectClass}
              value={filterDiameter}
              onChange={(e) => setFilterDiameter(e.target.value)}
            >
              <option>All Sizes</option>
              {DIAMETERS.map((d) => (
                <option key={d}>{d}&quot;</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Brand
            </label>
            <select
              className={selectClass}
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            >
              <option>All Brands</option>
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Sort
            </label>
            <select
              className={selectClass}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {[
                "Price: Low → High",
                "Price: High → Low",
                "Size: Small → Large",
                "Size: Large → Small",
                "Brand: A → Z",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={reset}
              className="font-mono text-xs text-brand-muted hover:text-brand-red uppercase tracking-widest transition-colors py-2 px-3 border border-transparent hover:border-brand-mid"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display font-bold text-2xl text-brand-mid uppercase">
              No tires found
            </p>
            <p className="font-body text-brand-muted mt-2">
              Try adjusting your search or filters
            </p>
            <button
              onClick={reset}
              className="mt-4 text-sm text-brand-red hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tire) => (
              <TireCard key={tire.id} tire={tire} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
