"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import TireCard from "./Cards/TireCard";
import { Tire } from "@/lib/tires";
import {
  AccordionKey,
  AccordionSection,
  CheckboxOption,
  PriceHistogram,
  SortOption,
  TYPE_DESCRIPTIONS,
} from "./Subcomponents";
import AnimatedLogo from "./AnimatedLogo";

export default function ShopSection() {
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDiameters, setSelectedDiameters] = useState<number[]>([]);
  const [priceMinPct, setPriceMinPct] = useState(0);
  const [priceMaxPct, setPriceMaxPct] = useState(100);
  const [sort, setSort] = useState<SortOption>("Price: Low - High");

  // Accordion open/closed
  const [openSections, setOpenSections] = useState<
    Record<AccordionKey, boolean>
  >({
    brand: false,
    type: true,
    diameter: false,
    price: true,
  });

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    async function fetchTires() {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tires`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch tires");
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

  // ── Derived filter options (from full tire list) ───────────────────────────

  const allBrands = useMemo(
    () => [...new Set(tires.map((t) => t.brand))].sort(),
    [tires],
  );
  const allTypes = useMemo(
    () => [...new Set(tires.map((t) => t.terrain).filter(Boolean))].sort(),
    [tires],
  );
  const allDiameters = useMemo(
    () => [...new Set(tires.map((t) => t.diameter))].sort((a, b) => a - b),
    [tires],
  );
  const absoluteMinPrice = useMemo(
    () =>
      tires.length ? Math.floor(Math.min(...tires.map((t) => t.price))) : 0,
    [tires],
  );
  const absoluteMaxPrice = useMemo(
    () =>
      tires.length ? Math.ceil(Math.max(...tires.map((t) => t.price))) : 1000,
    [tires],
  );

  // ── Counts (from full list so numbers don't shrink as you filter) ──────────

  const brandCounts = useMemo(
    () =>
      tires.reduce<Record<string, number>>((acc, t) => {
        acc[t.brand] = (acc[t.brand] || 0) + 1;
        return acc;
      }, {}),
    [tires],
  );
  const typeCounts = useMemo(
    () =>
      tires.reduce<Record<string, number>>((acc, t) => {
        if (t.terrain) acc[t.terrain] = (acc[t.terrain] || 0) + 1;
        return acc;
      }, {}),
    [tires],
  );
  const diameterCounts = useMemo(
    () =>
      tires.reduce<Record<number, number>>((acc, t) => {
        acc[t.diameter] = (acc[t.diameter] || 0) + 1;
        return acc;
      }, {}),
    [tires],
  );

  // ── Filtered + sorted tires ────────────────────────────────────────────────

  const priceMin =
    absoluteMinPrice +
    (priceMinPct / 100) * (absoluteMaxPrice - absoluteMinPrice);
  const priceMax =
    absoluteMinPrice +
    (priceMaxPct / 100) * (absoluteMaxPrice - absoluteMinPrice);

  const filtered = useMemo(() => {
    let result = tires.filter((t) => {
      if (selectedBrands.length && !selectedBrands.includes(t.brand))
        return false;
      if (selectedTypes.length && !selectedTypes.includes(t.terrain))
        return false;
      if (selectedDiameters.length && !selectedDiameters.includes(t.diameter))
        return false;
      if (t.price < priceMin || t.price > priceMax) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "Price: Low - High") return a.price - b.price;
      if (sort === "Price: High - Low") return b.price - a.price;
      if (sort === "Size: Small - Large") return a.diameter - b.diameter;
      if (sort === "Size: Large - Small") return b.diameter - a.diameter;
      if (sort === "Brand: A - Z") return a.brand.localeCompare(b.brand);
      return 0;
    });

    return result;
  }, [
    tires,
    selectedBrands,
    selectedTypes,
    selectedDiameters,
    priceMin,
    priceMax,
    sort,
  ]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const toggleAccordion = useCallback((id: AccordionKey) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const toggleDiameter = (d: number) =>
    setSelectedDiameters((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

  const reset = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedDiameters([]);
    setPriceMinPct(0);
    setPriceMaxPct(100);
    setSort("Price: Low - High");
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedTypes.length > 0 ||
    selectedDiameters.length > 0 ||
    priceMinPct > 0 ||
    priceMaxPct < 100;

  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-sm font-body px-3 py-2 pr-8 focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";

  // ── Sidebar content (shared between desktop + mobile) ─────────────────────

  const FilterSidebar = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-charcoal sticky top-0 bg-brand-dark z-10">
        <h3 className="font-display font-semibold text-xl text-white uppercase tracking-tight">
          Filter by
        </h3>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="font-display font-bold text-xs text-brand-red hover:underline uppercase tracking-widest transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Accordions */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Brand */}
        <AccordionSection
          id="brand"
          label="Brand"
          open={openSections.brand}
          onToggle={toggleAccordion}
        >
          {allBrands.map((brand) => (
            <CheckboxOption
              key={brand}
              label={brand}
              count={brandCounts[brand] || 0}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
          ))}
        </AccordionSection>

        {/* Tire type */}
        <AccordionSection
          id="type"
          label="Tire type"
          open={openSections.type}
          onToggle={toggleAccordion}
        >
          {allTypes.map((type) => (
            <CheckboxOption
              key={type}
              label={type}
              count={typeCounts[type] || 0}
              description={TYPE_DESCRIPTIONS[type]}
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
          ))}
        </AccordionSection>

        {/* Diameter */}
        <AccordionSection
          id="diameter"
          label="Diameter"
          open={openSections.diameter}
          onToggle={toggleAccordion}
        >
          {allDiameters.map((d) => (
            <CheckboxOption
              key={d}
              label={`${d}"`}
              count={diameterCounts[d] || 0}
              checked={selectedDiameters.includes(d)}
              onChange={() => toggleDiameter(d)}
            />
          ))}
        </AccordionSection>

        {/* Price */}
        <AccordionSection
          id="price"
          label="Price"
          open={openSections.price}
          onToggle={toggleAccordion}
        >
          <PriceHistogram
            tires={tires}
            minPct={priceMinPct}
            maxPct={priceMaxPct}
            absoluteMin={absoluteMinPrice}
            absoluteMax={absoluteMaxPrice}
            onMinChange={setPriceMinPct}
            onMaxChange={setPriceMaxPct}
          />
        </AccordionSection>

        {/* Sort (inside sidebar on desktop) */}
        <div className="px-6 py-5 border-b border-brand-charcoal">
          <p className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest mb-2">
            Sort
          </p>
          <select
            className={selectClass + " w-full"}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            {(
              [
                "Price: Low - High",
                "Price: High - Low",
                "Size: Small - Large",
                "Size: Large - Small",
                "Brand: A - Z",
              ] as SortOption[]
            ).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section className="bg-brand-dark py-20 sm:flex">
      {/* ── Desktop sidebar ── */}
      <div className="border-r-4 border-brand-charcoal rounded-2xl hidden md:flex md:flex-col sm:w-1/4 flex-shrink-0 bg-brand-charcoal/20 sticky top-20 h-screen overflow-hidden">
        {FilterSidebar}
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="font-display text-brand-red tracking-widest uppercase mb-2">
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
            Showing {filtered.length} of {tires.length} tires · In-Store Pickup
            Only
          </div>
        </div>

        {/* ── Mobile filters ── */}
        <div className="md:hidden mb-8 pb-6 border-b border-brand-charcoal bg-brand-charcoal/20 rounded-xl overflow-hidden">
          {FilterSidebar}
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="text-center py-24">
            <p className="font-body text-brand-muted mt-2 flex items-center justify-center gap-2">
              <AnimatedLogo size={2} withText={false} width={20} height={20} />
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display font-bold text-2xl text-brand-mid uppercase">
              No tires found
            </p>
            <p className="font-body text-brand-muted mt-2">
              Try adjusting your filters
            </p>
            <button
              onClick={reset}
              className="mt-4 text-sm text-brand-red hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((tire) => (
              <TireCard key={tire.id} tire={tire} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
