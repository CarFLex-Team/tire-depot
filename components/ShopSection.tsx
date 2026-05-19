"use client";
import { useState, useMemo } from "react";
import { TIRES, BRANDS, TYPES, DIAMETERS } from "@/lib/tires";
import TireCard from "./Cards/TireCard";

export default function ShopSection() {
  const [filterType, setFilterType] = useState("All Types");
  const [filterDiameter, setFilterDiameter] = useState("All Sizes");
  const [filterBrand, setFilterBrand] = useState("All Brands");
  const [sort, setSort] = useState("Price: Low - High");

  const filtered = useMemo(() => {
    let tires = [...TIRES];

    if (filterType !== "All Types")
      tires = tires.filter((t) => t.type === filterType);
    if (filterDiameter !== "All Sizes")
      tires = tires.filter((t) => t.diameter === parseInt(filterDiameter));
    if (filterBrand !== "All Brands")
      tires = tires.filter((t) => t.brand === filterBrand);

    tires.sort((a, b) => {
      if (sort === "Price: Low - High") return a.price - b.price;
      if (sort === "Price: High - Low") return b.price - a.price;
      if (sort === "Size: Small - Large") return a.diameter - b.diameter;
      if (sort === "Size: Large - Small") return b.diameter - a.diameter;
      if (sort === "Brand: A - Z") return a.brand.localeCompare(b.brand);
      return 0;
    });

    return tires;
  }, [filterType, filterDiameter, filterBrand, sort]);

  const reset = () => {
    setFilterType("All Types");
    setFilterDiameter("All Sizes");
    setFilterBrand("All Brands");
    setSort("Price: Low - High");
  };

  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-sm font-body px-3 py-2 pr-8 focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";

  return (
    <section id="shop" className="bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="font-display  text-brand-red tracking-widest uppercase mb-2">
              Our Inventory
            </p>
            <h2 className="font-mono text-4xl sm:text-5xl text-white uppercase tracking-tight">
              Shop Tires
            </h2>
            <p className="font-body text-brand-muted mt-2">
              Browse our real-time inventory — all prices shown per set unless
              noted
            </p>
          </div>
          <div className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest">
            Showing {filtered.length} tires · In-Store Pickup Only
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-brand-gray">
          <div className="flex flex-col gap-1">
            <label className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest">
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
            <label className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest">
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
            <label className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest">
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
            <label className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest">
              Sort
            </label>
            <select
              className={selectClass}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {[
                "Price: Low - High",
                "Price: High - Low",
                "Size: Small - Large",
                "Size: Large - Small",
                "Brand: A - Z",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={reset}
              className="font-display font-bold text-xs rounded-full text-brand-muted hover:text-brand-red uppercase tracking-widest transition-colors py-2 px-3 border border-transparent hover:border-brand-mid"
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
