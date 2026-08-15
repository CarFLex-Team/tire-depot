"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import CartInfoForm from "./Forms/CartInfoForm";
import CartItems from "./Forms/CartItems";
import AddAddressForm from "./Forms/AddAddressForm";
import Modal from "./Modals/Modal";
import { useCartUiStore } from "@/lib/store/cart-ui";
import { useRouter } from "next/navigation";

type Step = "cart" | "info";

export default function CartPanel() {
  const { data: session } = authClient.useSession();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { isOpen, closeCart } = useCartUiStore();
  const { items, totalItems, totalPrice, clearCart, setUserInfo, cartId } =
    useCart(session?.user?.id ?? "");
  const router = useRouter();

  const [step, setStep] = useState<Step>("cart");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressId: "",
  });

  const close = () => {
    closeCart();
    setTimeout(() => setStep("cart"), 400);
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

  const handleCheckout = () => setStep("info");
  const handleInfoBack = () => setStep("cart");

  async function handleInfoNext() {
    if (
      !info.firstName ||
      !info.lastName ||
      !info.email ||
      !info.phone ||
      !info.addressId
    )
      return;

    setUserInfo(info);
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          addressId: info.addressId,
          contact: {
            userId: session?.user?.id,
            email: info.email,
            phone: info.phone,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to create payment intent");

      closeCart();
      router.push("/checkout");
    } catch {
      setCheckoutError("Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

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
        className={`fixed inset-0 bg-black/60 z-30 overlay ${isOpen ? "open" : ""}`}
        onClick={closeCart}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-3/5 bg-brand-charcoal z-40 flex flex-col cart-panel ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray">
          <div>
            <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide">
              {step === "cart" ? "Your Cart" : "Your Info"}
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
        {step === "info" && (
          <div className="flex border-b border-brand-gray">
            {(["info", "payment"] as const).map((s, i) => (
              <div
                key={s}
                className={`flex-1 py-2 text-center font-mono text-[10px] uppercase tracking-widest ${
                  s === "info"
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
          {step === "cart" && (
            <CartItems
              handleCheckout={handleCheckout}
              userId={session?.user?.id ?? ""}
            />
          )}

          {step === "info" && (
            <>
              <CartInfoForm
                info={info}
                user={session?.user ?? null}
                setInfo={setInfo}
                handleInfoNext={handleInfoNext}
                handleInfoBack={handleInfoBack}
                emailDisabled={emailDisabled}
                onAddAddress={() => setAddressModalOpen(true)}
                isCheckoutLoading={checkoutLoading}
              />
              {checkoutError && (
                <p className="font-body text-brand-red text-sm text-center px-6 pb-4">
                  {checkoutError}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
