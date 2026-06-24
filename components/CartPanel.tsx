"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { Minus, Plus, ShoppingBag, Trash, Trash2, X } from "lucide-react";

type Step = "cart" | "info" | "payment" | "confirmation";

export default function CartPanel() {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const close = () => {
    dispatch({ type: "SET_OPEN", open: false });
    setTimeout(() => setStep("cart"), 400);
  };

  const handleCheckout = () => setStep("info");
  const handleInfoNext = () => {
    if (!info.firstName || !info.email) return;
    setStep("payment");
  };
  const handlePay = () => setStep("confirmation");
  const handleReset = () => {
    dispatch({ type: "CLEAR" });
    setStep("cart");
    close();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 overlay ${state.open ? "open" : ""}`}
        onClick={close}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-3/5 bg-brand-charcoal z-50 flex flex-col cart-panel ${state.open ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray">
          <div>
            <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide">
              {step === "cart" && `Your Cart`}
              {step === "info" && "Your Info"}
              {step === "payment" && "Payment"}
              {step === "confirmation" && "Confirmed!"}
            </h2>
            {step === "cart" && (
              <p className="font-mono text-xs text-brand-muted">
                {totalItems} items
              </p>
            )}
          </div>
          <button
            onClick={close}
            className="text-brand-muted hover:text-white transition-colors"
          >
            <X />
          </button>
        </div>

        {/* Steps indicator */}
        {step !== "cart" && step !== "confirmation" && (
          <div className="flex border-b border-brand-gray">
            {(["info", "payment"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`flex-1 py-2 text-center font-mono text-[10px] uppercase tracking-widest ${
                  step === s
                    ? "text-brand-red border-b-2 border-brand-red"
                    : "text-brand-mid"
                }`}
              >
                {i + 1}. {s === "info" ? "Info" : "Payment"}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* CART STEP */}
          {step === "cart" && (
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
          )}

          {/* INFO STEP */}
          {step === "info" && (
            <div className="p-6 flex flex-col gap-5">
              <p className="font-body text-sm text-brand-muted">
                Your info for order confirmation and pickup notification.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest block mb-1">
                    First Name *
                  </label>
                  <input
                    className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
                    value={info.firstName}
                    onChange={(e) =>
                      setInfo({ ...info, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest block mb-1">
                    Last Name *
                  </label>
                  <input
                    className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
                    value={info.lastName}
                    onChange={(e) =>
                      setInfo({ ...info, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest block mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest block mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  className="w-full bg-brand-dark border border-brand-mid text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-red"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                />
              </div>
              <div className="bg-brand-dark border border-brand-gray p-4">
                <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-1">
                  Pickup Location
                </p>
                <p className="font-body text-sm text-brand-muted">
                  Tire Depot — 5386 Pleasant View Rd, Memphis, TN 38134
                </p>
                <p className="font-body text-xs text-brand-muted mt-1">
                  We&apos;ll call you when your order is ready for pickup!
                </p>
              </div>
            </div>
          )}

          {/* PAYMENT STEP */}
          {step === "payment" && (
            <div className="p-6 flex flex-col gap-5">
              <div className="border border-brand-gray p-4">
                <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-3">
                  Order Summary
                </p>
                {state.items.map(({ tire, qty }) => (
                  <div key={tire.id} className="flex justify-between py-1">
                    <span className="font-body text-sm text-brand-muted">
                      {tire.brand} {tire.model} ×{qty}
                    </span>
                    <span className="font-mono text-sm text-white">
                      ${(tire.price * qty).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-brand-gray mt-3 pt-3 flex justify-between">
                  <span className="font-display font-bold text-sm text-white uppercase">
                    Total
                  </span>
                  <span className="font-display font-bold text-lg text-brand-red">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-brand-dark border border-brand-gray p-6 text-center">
                <svg
                  className="mx-auto mb-3"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <p className="font-mono text-xs text-brand-muted">
                  Secure payment powered by Square
                </p>
                <p className="font-body text-xs text-brand-mid mt-1">
                  Your payment info is encrypted and secure
                </p>
              </div>
            </div>
          )}

          {/* CONFIRMATION STEP */}
          {step === "confirmation" && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-5 min-h-64">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-2">
                  Order Placed!
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  Thanks {info.firstName}! We&apos;ll call you at{" "}
                  {info.phone || info.email} when your tires are ready for
                  pickup at our Memphis location.
                </p>
              </div>
              <div className="bg-brand-dark border border-brand-gray p-4 w-full text-left">
                <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-1">
                  Pickup At
                </p>
                <p className="font-body text-sm text-white">
                  5386 Pleasant View Rd, Memphis, TN 38134
                </p>
              </div>
              <button
                onClick={handleReset}
                className="font-mono text-xs text-brand-red uppercase tracking-widest hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer / action */}
        {step !== "confirmation" && (
          <div className="border-t border-brand-gray p-5 flex flex-col gap-3">
            {step === "cart" && state.items.length > 0 && (
              <>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-brand-muted uppercase">
                    Total {totalItems} tires
                  </span>
                  <span className="font-display font-semibold text-xl text-white">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  // onClick={handleCheckout}
                  className="max-w-full mx-5 bg-brand-red hover:bg-brand-red/90 rounded-full text-white py-3 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
            {step === "info" && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("cart")}
                  className="flex-1 border border-brand-mid text-brand-muted hover:text-white py-3 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleInfoNext}
                  className="flex-2 bg-brand-red hover:bg-[#cc1215] text-white py-3 px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Continue →
                </button>
              </div>
            )}
            {step === "payment" && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("info")}
                  className="flex-1 border border-brand-mid text-brand-muted hover:text-white py-3 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePay}
                  className="flex-2 bg-brand-red hover:bg-[#cc1215] text-white py-3 px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Pay ${totalPrice.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
