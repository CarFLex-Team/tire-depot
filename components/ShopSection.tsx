"use client";
import { useEffect, useMemo, useState } from "react";
import TireCard from "./Cards/TireCard";
import { Tire } from "@/lib/tires";
import { useSearchParams } from "next/navigation";
import FilterSidebar, { SortOption } from "./FilterSidebar";
import { ListFilter } from "lucide-react";
import Modal from "./UI/Modal";
import LoadingSkeleton from "./UI/LoadingSkeleton";

export default function ShopSection() {
  const searchParams = useSearchParams();

  const width = searchParams.get("width");
  const ratio = searchParams.get("ratio");
  const diameter = searchParams.get("diameter");
  // const loadIndex = searchParams.get("loadIndex");
  // const speedIndex = searchParams.get("speedIndex");
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLoads, setSelectedLoads] = useState<string[]>([]);
  const [selectedSpeeds, setSelectedSpeeds] = useState<string[]>([]);
  const [priceMinPct, setPriceMinPct] = useState(0);
  const [priceMaxPct, setPriceMaxPct] = useState(100);
  const [sort, setSort] = useState<SortOption>("Price: Low - High");
  const [showFilters, setShowFilters] = useState(false);
  const [tireSize, setTireSize] = useState(
    `${width || "???"}/${ratio || "???"}R${diameter || "???"}`,
  );
  const selectClass =
    "bg-brand-charcoal border border-brand-mid text-brand-light text-sm font-body px-4 py-2  focus:outline-none focus:border-brand-red transition-colors cursor-pointer rounded-full";

  // ── Filtered + sorted tires ────────────────────────────────────────────────
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
  const priceMin =
    absoluteMinPrice +
    (priceMinPct / 100) * (absoluteMaxPrice - absoluteMinPrice);
  const priceMax =
    absoluteMinPrice +
    (priceMaxPct / 100) * (absoluteMaxPrice - absoluteMinPrice);

  const activeFilterCount =
    selectedBrands.length +
    selectedTypes.length +
    selectedLoads.length +
    selectedSpeeds.length +
    (priceMinPct > 0 || priceMaxPct < 100 ? 1 : 0);

  const filtered = useMemo(() => {
    let result = tires.filter((t) => {
      if (selectedBrands.length && !selectedBrands.includes(t.brand))
        return false;
      if (selectedTypes.length && !selectedTypes.includes(t.terrain))
        return false;
      if (selectedLoads.length && !selectedLoads.includes(t.LoadIndex))
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
    selectedLoads,
    selectedSpeeds,
    priceMin,
    priceMax,
    sort,
  ]);
  const reset = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedLoads([]);
    setSelectedSpeeds([]);
    setPriceMinPct(0);
    setPriceMaxPct(100);
    setSort("Price: Low - High");
  };
  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    async function fetchTires() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tires?width=${width}&ratio=${ratio}&diameter=${diameter}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch tires");
      const data = await res.json();
      const fetchedTires = data.tires.map((t: any) => ({
        ...t,
        speedRating: t.speed_rating === null ? "other" : t.speed_rating,
        supplierItemNo: t.supplier_item_no,
        LoadIndex: t.load_index === null ? "other" : t.load_index,
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

  return (
    <>
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)}>
        <FilterSidebar
          isLoading={loading}
          tires={filtered}
          reset={reset}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedLoads={selectedLoads}
          setSelectedLoads={setSelectedLoads}
          selectedSpeeds={selectedSpeeds}
          setSelectedSpeeds={setSelectedSpeeds}
          priceMinPct={priceMinPct}
          setPriceMinPct={setPriceMinPct}
          priceMaxPct={priceMaxPct}
          setPriceMaxPct={setPriceMaxPct}
          absoluteMinPrice={absoluteMinPrice}
          absoluteMaxPrice={absoluteMaxPrice}
        />
      </Modal>

      <section className="bg-brand-dark py-20 sm:flex">
        {/* ── Desktop sidebar ── */}
        <div className="border-r-4 border-brand-charcoal rounded-2xl hidden md:flex md:flex-col sm:w-1/4 flex-shrink-0 bg-brand-charcoal/20 sticky top-20 h-screen overflow-hidden">
          <FilterSidebar
            isLoading={loading}
            tires={filtered}
            reset={reset}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedLoads={selectedLoads}
            setSelectedLoads={setSelectedLoads}
            selectedSpeeds={selectedSpeeds}
            setSelectedSpeeds={setSelectedSpeeds}
            priceMinPct={priceMinPct}
            setPriceMinPct={setPriceMinPct}
            priceMaxPct={priceMaxPct}
            setPriceMaxPct={setPriceMaxPct}
            absoluteMinPrice={absoluteMinPrice}
            absoluteMaxPrice={absoluteMaxPrice}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="font-display text-brand-red tracking-widest uppercase mb-2">
                Shop Tires
              </p>
              <h2 className="font-mono text-4xl sm:text-5xl text-white uppercase tracking-tight">
                {tireSize} Tires
              </h2>
              <p className="font-body text-brand-muted mt-2">
                Browse our real-time inventory — all prices shown per set unless
                noted
              </p>
            </div>
            <div className="font-display font-semibold text-sm text-brand-muted uppercase tracking-widest">
              Showing {filtered.length} of {tires.length} tires · In-Store
              Pickup Only
            </div>
          </div>

          {/* ── Mobile filters ── */}
          <div className=" mb-3 pb-2 border-b border-brand-charcoal flex items-center  gap-4 flex-wrap">
            <button
              className={selectClass + " flex items-center gap-2 md:hidden"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <ListFilter size={16} /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-brand-red text-white text-xs font-display font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              className={selectClass + " pr-8"}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              {(["Price: Low - High", "Price: High - Low"] as SortOption[]).map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>

          {/* ── Grid ── */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 ">
              <div>
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
              </div>
              <div>
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
              </div>
              <div>
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
                <LoadingSkeleton height={12} />
              </div>
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
    </>
  );
}
