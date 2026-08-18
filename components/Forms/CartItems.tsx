import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash, TriangleAlert } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUiStore } from "@/lib/store/cart-ui";
import AnimatedLogo from "../AnimatedLogo";
export default function CartItems({
  handleCheckout,
  userId,
}: {
  handleCheckout: () => void;
  userId: string;
}) {
  const {
    updateQtyAsync,
    removeItem,
    totalItems,
    totalPrice,
    items,
    isUpdating,
  } = useCart(userId);
  const { closeCart } = useCartUiStore();
  const hasPriceChanges = items.some(
    ({ tire, original_unit_price }) => original_unit_price !== tire.price,
  );
  if (isUpdating) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <AnimatedLogo withText={false} width={20} height={20} />
        <p className="font-display font-semibold text-white text-lg">
          Updating cart...
        </p>
      </div>
    );
  }
  return (
    <>
      {hasPriceChanges && (
        <div className="bg-amber-950/60 border border-amber-700 rounded-full px-4 py-2 m-3 ">
          <span className="text-amber-400 text-xs font-display uppercase tracking-widest flex items-center gap-2">
            <TriangleAlert size={16} /> Some prices in your cart have changed
            since you added them
          </span>
        </div>
      )}
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-brand-gray" />
            <p className="font-display font-bold text-brand-mid uppercase">
              Your cart is empty
            </p>
            <a
              href="/#search-section"
              onClick={closeCart}
              className="font-display font-semibold text-brand-red uppercase tracking-widest"
            >
              Start Shopping →
            </a>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col divide-y divide-brand-gray">
              {items.map(({ tire, qty }) => (
                <div key={tire.id} className="flex gap-4 p-5">
                  <div className="w-24 h-24 bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src={tire.imageUrl ?? "/logo.png"}
                      alt={tire.model}
                      className="w-full h-full object-contain"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="font-display text-sm text-brand-red">
                          {tire.brand.toUpperCase()}
                        </p>
                        <p className="font-display font-semibold  text-white truncate">
                          {tire.model}
                        </p>
                        <p className="font-display text-lg text-brand-light">
                          {tire.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(tire.id)}
                        disabled={isUpdating}
                        className=" p-1.5 flex items-center justify-center text-brand-red bg-brand-gray hover:bg-brand-mid rounded-full transition-colors text-sm"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isUpdating}
                          onClick={async () =>
                            qty === 1
                              ? removeItem(tire.id)
                              : await updateQtyAsync(tire.id, qty - 1)
                          }
                          className="w-6 h-6 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm "
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-sm text-white w-4 text-center">
                          {qty}
                        </span>
                        <button
                          disabled={isUpdating}
                          onClick={async () =>
                            await updateQtyAsync(tire.id, qty + 1)
                          }
                          className="w-6 h-6 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm "
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-display font-semibold text-2xl text-white">
                        ${(tire.price * qty).toFixed(2).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-brand-charcoal border-t border-brand-gray p-5 z-10">
          <div className="flex justify-between">
            <span className="font-mono text-sm text-brand-muted uppercase">
              Total {totalItems} tires
            </span>
            <span className="font-display font-semibold text-xl text-white">
              ${totalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full my-2 bg-brand-red hover:bg-brand-red/90 rounded-full text-white py-3 font-display font-bold text-sm uppercase tracking-widest transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  );
}
