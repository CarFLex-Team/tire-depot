import { Address, deleteAddress } from "@/lib/api/addresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

export default function DeleteConfirmForm({
  address,
  onClose,
  userId,
}: {
  address: Address;
  onClose: () => void;
  userId?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAddress(address.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
      onClose();
    },
  });

  return (
    <div className="w-full  bg-brand-charcoal rounded-2xl border border-brand-mid/20 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-brand-mid/20">
        <h2 className="font-mono text-white text-xl uppercase">
          Delete Address
        </h2>
        <button
          onClick={onClose}
          className="text-brand-muted hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-6 py-6">
        <p className="font-body text-brand-muted text-sm mb-2">
          Are you sure you want to delete this address?
        </p>
        <div className="bg-brand-dark border border-brand-mid/20 rounded-xl p-4 mt-3">
          {address.label && (
            <span className="inline-block mb-1.5 font-display text-xs uppercase tracking-widest text-brand-red border border-brand-red/40 rounded-full px-2.5 py-0.5">
              {address.label}
            </span>
          )}
          <p className="font-body text-brand-muted text-sm">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
            <br />
            {address.city}, {address.state} {address.postal_code}
          </p>
        </div>
      </div>

      <div className="px-6 py-5 border-t border-brand-mid/20 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl border border-brand-mid text-brand-muted hover:border-brand-red hover:text-brand-red transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="flex-1 py-3 font-display font-bold uppercase tracking-widest text-sm rounded-xl bg-brand-red text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
