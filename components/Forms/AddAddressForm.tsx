"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress, AddressForm, STATES } from "@/lib/api/addresses";

const EMPTY_FORM: AddressForm = {
  label: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
};

interface Props {
  userId: string | undefined;
  onClose: () => void;
  noClose?: boolean;
  onSubmit?: () => void;
  setAddedZip?: (zip: string) => void;
  title?: string;
}

const inputClass =
  "w-full bg-brand-dark border border-brand-mid/40 rounded-xl px-4 py-3 font-body text-sm text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-red transition-colors";

const labelClass =
  "block font-display text-xs uppercase tracking-widest text-brand-muted mb-1.5";

export default function AddAddressForm({
  onClose,
  userId,
  noClose,
  onSubmit,
  setAddedZip,
  title,
}: Props) {
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);
  const [validationError, setValidationError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // console.log("userId in AddAddressForm:", userId);
  const { mutate, isPending, error } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
      setForm(EMPTY_FORM);
      onClose();
      onSubmit?.();
    },
  });

  function set(field: keyof AddressForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    if (
      !form.label ||
      !form.line1 ||
      !form.city ||
      !form.state ||
      !form.postal_code
    ) {
      setValidationError("Please fill in all required fields.");
      return;
    }
    setValidationError(null);
    setAddedZip?.(form.postal_code);
    mutate({ ...form, user_id: userId });
  }

  return (
    <div className="w-full bg-brand-charcoal rounded-2xl border border-brand-mid/20 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-brand-mid/20">
        <div>
          <p className="font-display text-brand-red tracking-widest uppercase text-xs mb-0.5">
            Addresses
          </p>
          <h2 className="font-mono text-white text-xl uppercase">
            {title ? title : "Add New Address"}
          </h2>
        </div>
        {!noClose && (
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-6 flex flex-col gap-4   overflow-y-auto">
        <div>
          <label className={labelClass}>
            Label <span className="text-brand-red">*</span>{" "}
          </label>
          <input
            className={inputClass}
            placeholder="e.g. Home, Work"
            value={form.label}
            onChange={(e) => set("label", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>
            Address line 1 <span className="text-brand-red">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="123 Main St"
            value={form.line1}
            onChange={(e) => set("line1", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Address line 2</label>
          <input
            className={inputClass}
            placeholder="Apt, suite, unit (optional)"
            value={form.line2}
            onChange={(e) => set("line2", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>
            City <span className="text-brand-red">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="Memphis"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>
              State <span className="text-brand-red">*</span>
            </label>
            <select
              required
              className={inputClass}
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
            >
              <option value="" disabled>
                Select a state
              </option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Postal code <span className="text-brand-red">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="10001"
              value={form.postal_code}
              onChange={(e) => set("postal_code", e.target.value)}
            />
          </div>
        </div>

        {/* Validation error (client-side) */}
        {validationError && (
          <p className="font-body text-brand-red text-sm">{validationError}</p>
        )}
        {/* Server/network error (from useMutation) */}
        {error && !validationError && (
          <p className="font-body text-brand-red text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-brand-mid/20 flex gap-3">
        {!noClose && (
          <button
            onClick={onClose}
            className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl border border-brand-mid text-brand-muted hover:border-brand-red hover:text-brand-red transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl bg-brand-red text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
}
