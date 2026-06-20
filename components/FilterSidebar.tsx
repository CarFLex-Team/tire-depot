import { useCallback, useEffect, useMemo, useState } from "react";

import { Tire } from "@/lib/tires";
import { AccordionKey, AccordionSection } from "./UI/AccordionSection";
import { CheckboxOption } from "./UI/CheckboxOptoin";
import { PriceHistogram } from "./UI/PriceHistogram";
export type SortOption = "Price: Low - High" | "Price: High - Low";

export const TYPE_DESCRIPTIONS: Record<string, string> = {
  "All Season": "Good handle on dry, wet or snow",
  "All Weather":
    "Combines All Season and Winter tire traits for strong traction year-round",
  "All Terrain":
    "All-terrain tires offer drivers traction on- and off-road, ideal for SUV and light truck drivers",
};

export default function FilterSidebar({
  reset,
  tires,
  selectedBrands,
  selectedTypes,
  selectedLoads,
  selectedSpeeds,
  priceMinPct,
  priceMaxPct,
  activeFilterCount,
  absoluteMinPrice,
  absoluteMaxPrice,
  setSelectedBrands,
  setSelectedTypes,
  setSelectedLoads,
  setSelectedSpeeds,
  setPriceMinPct,
  setPriceMaxPct,
  isLoading,
}: {
  reset: () => void;
  tires: Tire[];
  selectedBrands: string[];
  selectedTypes: string[];
  selectedLoads: string[];
  selectedSpeeds: string[];
  priceMinPct: number;
  priceMaxPct: number;
  activeFilterCount?: number;
  absoluteMinPrice: number;
  absoluteMaxPrice: number;
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedLoads: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSpeeds: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceMinPct: (pct: number) => void;
  setPriceMaxPct: (pct: number) => void;
  isLoading: boolean;
}) {
  // Filter state

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  // Accordion open/closed
  const [openSections, setOpenSections] = useState<
    Record<AccordionKey, boolean>
  >({
    brand: false,
    type: false,
    load: false,
    price: false,
    speed: false,
  });
  useEffect(() => {
    if (!isLoading) {
      setOpenSections({
        brand: false,
        type: false,
        load: false,
        price: true,
        speed: false,
      });
    }
  }, [isLoading]);

  const allBrands = useMemo(
    () => [...new Set(tires.map((t) => t.brand))].sort(),
    [tires],
  );
  const allTypes = useMemo(
    () => [...new Set(tires.map((t) => t.terrain).filter(Boolean))].sort(),
    [tires],
  );
  const allLoads = useMemo(
    () => [...new Set(tires.map((t) => t.LoadIndex))].sort(),
    [tires],
  );
  const allSpeeds = useMemo(
    () => [...new Set(tires.map((t) => t.speedRating).filter(Boolean))].sort(),
    [tires],
  );

  useEffect(() => {
    if (searchTerm.trim() === "") return setFilteredBrands(allBrands);
    const lower = searchTerm.toLowerCase();
    setFilteredBrands(
      allBrands.filter((b) => b.toLowerCase().includes(lower)).sort(),
    );
  }, [searchTerm, allBrands]);
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
  const loadCounts = useMemo(
    () =>
      tires.reduce<Record<string, number>>((acc, t) => {
        acc[t.LoadIndex] = (acc[t.LoadIndex] || 0) + 1;
        return acc;
      }, {}),
    [tires],
  );
  const speedCounts = useMemo(
    () =>
      tires.reduce<Record<string, number>>((acc, t) => {
        if (t.speedRating) acc[t.speedRating] = (acc[t.speedRating] || 0) + 1;
        return acc;
      }, {}),
    [tires],
  );

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
      prev.includes(type)
        ? prev.filter((t: string) => t !== type)
        : [...prev, type],
    );

  const toggleLoad = (load: string) =>
    setSelectedLoads((prev) =>
      prev.includes(load)
        ? prev.filter((x: string) => x !== load)
        : [...prev, load],
    );

  const toggleSpeed = (speed: string) =>
    setSelectedSpeeds((prev) =>
      prev.includes(speed)
        ? prev.filter((s: string) => s !== speed)
        : [...prev, speed],
    );

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedTypes.length > 0 ||
    selectedLoads.length > 0 ||
    selectedSpeeds.length > 0 ||
    priceMinPct > 0 ||
    priceMaxPct < 100;

  return (
    <div className="flex flex-col h-full pb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-charcoal sticky top-0 bg-brand-dark z-10">
        <h3 className="font-display font-semibold text-xl text-white uppercase tracking-tight">
          Filter by
          {activeFilterCount !== undefined && activeFilterCount !== 0 && (
            <span className="ml-1 text-sm text-brand-red">
              ({activeFilterCount})
            </span>
          )}
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
      <div className="flex-1 overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Brand */}
        <AccordionSection
          id="brand"
          label="Brand"
          open={openSections.brand}
          onToggle={toggleAccordion}
          isLoading={isLoading}
        >
          <div className="flex items-center justify-between my-2">
            <input
              type="text"
              placeholder="Search brands..."
              className="w-full mb-3 px-3 py-2 bg-brand-charcoal border border-brand-mid text-sm text-brand-light focus:outline-none focus:border-brand-red transition-colors rounded-full"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredBrands.map((brand) => (
              <CheckboxOption
                key={brand}
                label={brand}
                count={brandCounts[brand] || 0}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Tire type */}
        <AccordionSection
          id="type"
          label="Tire type"
          open={openSections.type}
          onToggle={toggleAccordion}
          isLoading={isLoading}
        >
          <div className="max-h-60 overflow-y-auto">
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
          </div>
        </AccordionSection>

        {/* Price */}
        <AccordionSection
          id="price"
          label="Price"
          open={openSections.price}
          onToggle={toggleAccordion}
          isLoading={isLoading}
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
        {/* Load */}
        <AccordionSection
          id="load"
          label="Load"
          open={openSections.load}
          onToggle={toggleAccordion}
          isLoading={isLoading}
        >
          <div className="max-h-60 overflow-y-auto">
            {allLoads.map((load) => (
              <CheckboxOption
                key={load}
                label={`${load}`}
                count={loadCounts[load] || 0}
                checked={selectedLoads.includes(load)}
                onChange={() => toggleLoad(load)}
              />
            ))}
          </div>
        </AccordionSection>
        {/* Speed */}
        <AccordionSection
          id="speed"
          label="Speed Rating"
          open={openSections.speed}
          onToggle={toggleAccordion}
          isLoading={isLoading}
        >
          <div className="max-h-60 overflow-y-auto">
            {allSpeeds.map((speed) => (
              <CheckboxOption
                key={speed}
                label={`${speed}`}
                count={speedCounts[speed] || 0}
                checked={selectedSpeeds.includes(speed)}
                onChange={() => toggleSpeed(speed)}
              />
            ))}
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
