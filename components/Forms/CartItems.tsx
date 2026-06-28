import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import { useCart } from "@/lib/cart";
export default function CartItems({
  handleCheckout,
}: {
  handleCheckout: () => void;
}) {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  return (
    <>
      <div className="flex flex-col h-full">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-brand-gray" />
            <p className="font-display font-bold text-brand-mid uppercase">
              Your cart is empty
            </p>
            <a
              href="/#search-section"
              onClick={close}
              className="font-display font-semibold text-brand-red uppercase tracking-widest"
            >
              Start Shopping →
            </a>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col divide-y divide-brand-gray">
              {state.items.map(({ tire, qty }) => (
                <div key={tire.id} className="flex gap-4 p-5">
                  <div className="w-24 h-24 bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src={tire.imageUrl}
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
                        onClick={() =>
                          dispatch({ type: "REMOVE", id: tire.id })
                        }
                        className=" p-1.5 flex items-center justify-center text-brand-red bg-brand-gray hover:bg-brand-mid rounded-full transition-colors text-sm"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            qty === 1
                              ? dispatch({ type: "REMOVE", id: tire.id })
                              : dispatch({
                                  type: "UPDATE_QTY",
                                  id: tire.id,
                                  qty: qty - 1,
                                })
                          }
                          className="w-6 h-6 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-sm text-white w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QTY",
                              id: tire.id,
                              qty: qty + 1,
                            })
                          }
                          className="w-6 h-6 bg-brand-gray flex items-center justify-center text-white hover:bg-brand-red transition-colors text-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-display font-semibold text-2xl text-white">
                        ${(tire.price * qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {state.items.length > 0 && (
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
