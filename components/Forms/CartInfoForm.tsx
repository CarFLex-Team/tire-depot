"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAddresses, Address } from "@/lib/api/addresses";
import AddressPicker from "../UI/AddressPicker";
import { Lock } from "lucide-react";

type CartInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressId: string;
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
  isCheckoutLoading: boolean;
};

const inputClass =
  "w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red";
const labelClass =
  "font-display font-semibold text-sm text-brand-muted uppercase tracking-widest block mb-1";

export default function CartInfoForm({
  info,
  setInfo,
  handleInfoNext,
  handleInfoBack,
  emailDisabled,
  onAddAddress,
  user,
  isCheckoutLoading = false,
}: CartInfoFormProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [phoneError, setPhoneError] = useState<string | null>(null);

  function handleNext() {
    const digits = info.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setPhoneError("Please enter a valid 10-digit US phone number.");
      return;
    }
    setPhoneError(null);
    handleInfoNext();
  }
  const { data: savedAddresses = [], isLoading } = useQuery<Address[]>({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user?.id || ""),
  });

  useEffect(() => {
    if (savedAddresses.length > 0 && selectedAddressId === null) {
      applyAddress(savedAddresses[0]);
    }
  }, [savedAddresses, selectedAddressId]);

  function applyAddress(a: Address) {
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
  function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return (
    <>
      <div className="p-6 flex flex-col gap-5 pb-32">
        <p className="font-body text-sm text-brand-muted">
          Shipping Information
        </p>

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

        <div>
          <label className={labelClass}>Phone *</label>
          <input
            required
            type="tel"
            placeholder="(901) 555-1234"
            className={`${inputClass} ${phoneError ? "border-brand-red" : ""}`}
            value={info.phone}
            onChange={(e) => {
              setPhoneError(null);
              setInfo({ ...info, phone: formatPhone(e.target.value) });
            }}
          />
          {phoneError && (
            <p className="font-body text-brand-red text-xs mt-1">
              {phoneError}
            </p>
          )}
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
            onClick={handleNext}
            disabled={!canContinue || isCheckoutLoading}
            className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-red"
          >
            {isCheckoutLoading ? (
              "Processing..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock size={16} /> Checkout
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
