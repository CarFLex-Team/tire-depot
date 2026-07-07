"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import CartInfoForm from "./Forms/CartInfoForm";
import CartItems from "./Forms/CartItems";
import AddAddressForm from "./Forms/AddAddressForm";
import Modal from "./UI/Modal";

type Step = "cart" | "info" | "payment" | "confirmation";

export default function CartPanel() {
  const { data: session, isPending } = authClient.useSession();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressId: "",
  });
  const close = () => {
    dispatch({ type: "SET_OPEN", open: false });
    setTimeout(() => setStep("cart"), 400);
  };

  const handleCheckout = () => setStep("info");
  const handleInfoNext = () => {
    if (
      !info.firstName ||
      !info.email ||
      !info.phone ||
      !info.lastName ||
      !info.addressId
    )
      return;
    dispatch({ type: "SET_USER_INFO", userInfo: info });
    setStep("payment");
  };
  const handleInfoBack = () => setStep("cart");
  const handlePay = () => setStep("confirmation");
  const handleReset = () => {
    dispatch({ type: "CLEAR" });
    setStep("cart");
    close();
  };
  useEffect(() => {
    if (session) {
      setInfo({
        firstName: session.user?.name?.split(" ")[0] || "",
        lastName: session.user?.last_name || "",
        email: session.user?.email || "",
        phone: "",
        addressId: "",
      });
      setEmailDisabled(true);
    }
  }, [session]);
  return (
    <>
      <Modal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      >
        <AddAddressForm
          onClose={() => setAddressModalOpen(false)}
          userId={session?.user?.id}
        />
      </Modal>
      <div
        className={`fixed inset-0 bg-black/60 z- overlay ${state.open ? "open" : ""}`}
        onClick={close}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-3/5 bg-brand-charcoal z-40 flex flex-col cart-panel ${state.open ? "open" : ""}`}
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
          {step === "cart" && <CartItems handleCheckout={handleCheckout} />}

          {/* INFO STEP */}
          {step === "info" && (
            <CartInfoForm
              info={info}
              user={session?.user ?? null}
              setInfo={setInfo}
              handleInfoNext={handleInfoNext}
              handleInfoBack={handleInfoBack}
              emailDisabled={emailDisabled}
              onAddAddress={() => setAddressModalOpen(true)}
            />
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

              {/* <div className="bg-brand-dark border border-brand-gray p-6 text-center">
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
              </div> */}
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
        {step !== "confirmation" && step !== "info" && (
          <div className="border-t border-brand-gray p-5 flex flex-col gap-3">
            {step === "payment" && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("info")}
                  className="flex-2 border border-brand-mid text-brand-muted hover:text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Back
                </button>
                <button
                  // onClick={handlePay}
                  className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3 px-3 md:px-6 font-display font-bold text-sm uppercase tracking-widest transition-colors"
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
