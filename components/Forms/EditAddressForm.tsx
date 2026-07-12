import { Address, STATES, updateAddress } from "@/lib/api/addresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";

const inputClass =
  "w-full bg-brand-dark border border-brand-mid/40 rounded-xl px-4 py-3 font-body text-sm text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-red transition-colors";
const labelClass =
  "block font-display text-xs uppercase tracking-widest text-brand-muted mb-1.5";
export default function EditAddressForm({
  address,
  onClose,
  userId,
}: {
  address: Address;
  onClose: () => void;
  userId?: string;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    label: address.label ?? "",
    line1: address.line1,
    line2: address.line2 ?? "",
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
  });
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateAddress(address.id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
      onClose();
    },
    onError: () => setError("Something went wrong. Please try again."),
  });

  function set(field: keyof typeof form, value: string) {
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
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    mutate();
  }

  return (
    <div className="w-full bg-brand-charcoal rounded-2xl border border-brand-mid/20 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between px-6 py-5 border-b border-brand-mid/20">
        <div>
          <p className="font-display text-brand-red tracking-widest uppercase text-xs mb-0.5">
            Addresses
          </p>
          <h2 className="font-mono text-white text-xl uppercase">
            Edit Address
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-brand-muted hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        <div>
          <label className={labelClass}>
            Label <span className="text-brand-red">*</span>
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
              {STATES.map((state: string) => (
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

        {error && <p className="font-body text-brand-red text-sm">{error}</p>}
      </div>

      <div className="px-6 py-5 border-t border-brand-mid/20 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl border border-brand-mid text-brand-muted hover:border-brand-red hover:text-brand-red transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl bg-brand-red text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
