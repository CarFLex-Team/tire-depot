"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getAddresses } from "@/lib/api/addresses";

type CartInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressId: string;
};

type SavedAddress = {
  id: string;
  label?: string;
  full_name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

type CartInfoFormProps = {
  info: CartInfo;
  user: {
    id: string;
    name: string;
    email: string;
    last_name: string;
  } | null;
  setInfo: (info: CartInfo) => void;
  handleInfoNext: () => void;
  handleInfoBack: () => void;
  emailDisabled: boolean;
  onAddAddress: () => void;
};

const inputClass =
  "w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red";
const labelClass =
  "font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1";

// ── Skeleton card ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-52 h-28 p-4 border border-brand-mid/20 bg-brand-charcoal/40 flex flex-col gap-2 relative overflow-hidden">
      <div className="h-3 w-12 bg-brand-mid/30 rounded-full animate-pulse" />
      <div className="h-3 w-36 bg-brand-mid/20 rounded-full animate-pulse" />
      <div className="h-3 w-28 bg-brand-mid/20 rounded-full animate-pulse" />
      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

// ── Address picker ─────────────────────────────────────────────
function AddressPicker({
  addresses,
  selectedId,
  onSelect,
  onAddAddress,
  isLoading,
}: {
  addresses: SavedAddress[];
  selectedId: string | null;
  onSelect: (a: SavedAddress) => void;
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

// ── Main form ─────────────────────────────────────────────────
export default function CartInfoForm({
  info,
  setInfo,
  handleInfoNext,
  handleInfoBack,
  emailDisabled,
  onAddAddress,
  user,
}: CartInfoFormProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const { data: savedAddresses = [], isLoading } = useQuery<SavedAddress[]>({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user?.id || ""),
  });

  useEffect(() => {
    if (savedAddresses.length > 0 && selectedAddressId === null) {
      applyAddress(savedAddresses[0]);
    }
  }, [savedAddresses, selectedAddressId, applyAddress]);

  function applyAddress(a: SavedAddress) {
    setSelectedAddressId(a.id);
    setInfo({ ...info, addressId: a.id });
  }

  const canContinue = !!(
    info.firstName &&
    info.lastName &&
    info.email &&
    info.phone &&
    info.addressId
  );

  return (
    <>
      <div className="p-6 flex flex-col gap-5 pb-32">
        <p className="font-body text-sm text-brand-muted">
          Shipping Information
        </p>

        {/* Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>First Name *</label>
            <input
              required
              className={inputClass}
              value={info.firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              required
              className={inputClass}
              value={info.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email *</label>
          <input
            required
            type="email"
            className={`${inputClass} disabled:bg-brand-gray disabled:text-brand-muted`}
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            disabled={emailDisabled}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            required
            type="tel"
            className={inputClass}
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
        </div>

        {/* Address picker */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>Select Address</p>
          <AddressPicker
            addresses={savedAddresses}
            selectedId={selectedAddressId}
            onSelect={applyAddress}
            onAddAddress={onAddAddress}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-charcoal border-t border-brand-gray p-5 z-10">
        <div className="flex gap-3">
          <button
            onClick={handleInfoBack}
            className="flex-2 border border-brand-mid text-brand-muted hover:text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleInfoNext}
            disabled={!canContinue}
            className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-red"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
}
