"use client";
import { useState, useMemo, useEffect } from "react";
import { Tire } from "@/lib/tires";
import TireCard from "./Cards/TireCard";
import AnimatedLogo from "./AnimatedLogo";

export default function ShopSection() {
  const [filterType, setFilterType] = useState("All Types");
  const [filterDiameter, setFilterDiameter] = useState("All Sizes");
  const [filterBrand, setFilterBrand] = useState("All Brands");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: false,
    type: true,
    diameter: false,
    price: true,
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDiameters, setSelectedDiameters] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sort, setSort] = useState("Price: Low - High");
  const [tires, setTires] = useState([] as Tire[]);
  const [BRANDS, setBRANDS] = useState([] as string[]);
  const [TYPES, setTYPES] = useState([] as string[]);
  const [DIAMETERS, setDIAMETERS] = useState([] as number[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTires() {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tires`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tires");
      }
      const data = await res.json();
      const fetchedTires = data.tires.map((t: any) => ({
        ...t,
        speedRating: t.speed_rating,
        supplierItemNo: t.supplier_item_no,
        LoadIndex: t.load_index,
        imageUrl: t.image_url,
        inStock: t.in_stock,
        class: t.tire_class,
        diameter: parseInt(t.rim_diameter),
        price: parseFloat(t.public_price),
      })) as Tire[];
      setTires(fetchedTires);
      setLoading(false);
    }
    fetchTires();
  }, []);
  const brandCounts = useMemo(
    () =>
      tires.reduce(
        (acc, t) => ({ ...acc, [t.brand]: (acc[t.brand] || 0) + 1 }),
        {} as Record<string, number>,
      ),
    [tires],
  );
  const filtered = useMemo(() => {
    return tires
      .filter(
        (t) => selectedBrands.length === 0 || selectedBrands.includes(t.brand),
      )
      .filter(
        (t) => selectedTypes.length === 0 || selectedTypes.includes(t.terrain),
      )
      .filter(
        (t) =>
          selectedDiameters.length === 0 ||
          selectedDiameters.includes(t.diameter),
      )
      .filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1])
      .sort(/* your sort logic */);
  }, [
    tires,
    selectedBrands,
    selectedTypes,
    selectedDiameters,
    priceRange,
    sort,
  ]);

  const reset = () => {
    setFilterType("All Types");
    setFilterDiameter("All Sizes");
    setFilterBrand("All Brands");
    setSort("Price: Low - High");
  };

  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-sm font-body px-3 py-2 pr-8 focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";

  return (
    <section className="bg-brand-dark py-20 sm:flex">
      <div className=" border-r-4 border-brand-charcoal rounded-2xl hidden md:block sm:w-1/4 flex-shrink-0 bg-brand-charcoal/20  sticky top-20 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <h3 className="font-display font-semibold text-3xl text-white uppercase tracking-tight sticky top-0 left-0 w-full bg-brand-dark py-4 px-10 border-b border-brand-charcoal">
          Filter & Sort
        </h3>
        <div className="flex flex-col gap-6 p-8 pb-24 ">
          <div className="flex flex-col gap-1">
            <label className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest">
              Brand
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
          <button
            onClick={reset}
            className="font-display font-bold text-xs rounded-full text-brand-muted hover:text-brand-red uppercase tracking-widest transition-colors py-2 px-3 border border-transparent hover:border-brand-mid"
          >
            Reset
          </button>
        </div>
      </div>

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
            Showing {tires.length} tires · In-Store Pickup Only
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-brand-gray md:hidden">
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
        {loading ? (
          <div className="text-center py-24">
            <p className="font-body text-brand-muted mt-2 flex items-center justify-center gap-2">
              <AnimatedLogo size={2} withText={false} width={20} height={20} />
            </p>
          </div>
        ) : tires.length === 0 ? (
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
          <div className="grid grid-cols-1  gap-4">
            {tires.map((tire) => (
              <TireCard key={tire.id} tire={tire} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
