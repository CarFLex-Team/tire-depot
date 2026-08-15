"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripePaymentForm({
  total,
  subtotal,
  tax,
}: {
  total: number;
  subtotal: number;
  tax: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setPaying(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed. Please try again.");
      setPaying(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && <p className="font-body text-brand-red text-sm">{error}</p>}

      <button
        onClick={handlePay}
        disabled={paying || !stripe}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-4 font-display font-bold text-sm uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paying ? "Processing..." : `Pay $${total.toLocaleString()}`}
      </button>
    </div>
  );
}
