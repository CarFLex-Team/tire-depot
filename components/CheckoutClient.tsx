"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./Forms/StripePaymentForm";
import { useCart } from "@/lib/cart";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutClient({
  clientSecret,
  total,
  subtotal,
  tax,
}: {
  clientSecret: string;
  total: number;
  subtotal: number;
  tax: number;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { items } = useCart(session?.user?.id ?? "");

  return (
    <section className="bg-brand-dark min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="font-mono text-sm text-brand-muted hover:text-white transition-colors mb-4 flex items-center gap-2"
          >
            <ArrowLeft /> Back
          </button>
          <p className="font-display text-brand-red tracking-widest uppercase text-sm mb-1">
            Checkout
          </p>
          <h1 className="font-mono text-3xl sm:text-4xl text-white uppercase">
            Payment
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-6 flex flex-col gap-4">
            <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Order Summary
            </p>

            <div className="flex flex-col gap-4">
              {items.map(({ tire, qty }) => (
                <div
                  key={tire.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-display font-bold text-white text-sm uppercase">
                      {tire.brand} {tire.model}
                    </p>
                    <p className="font-mono text-brand-muted text-xs mt-0.5">
                      {tire.width}/{tire.aspectRatio}R{tire.diameter}
                    </p>
                    <p className="font-mono text-brand-muted text-xs">
                      Qty: {qty}
                    </p>
                  </div>
                  <span className="font-mono text-white text-sm flex-shrink-0">
                    ${(tire.price * qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-brand-mid/20 pt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-body text-brand-muted text-sm">
                  Subtotal
                </span>
                <span className="font-mono text-white text-sm">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-brand-muted text-sm">Tax</span>
                <span className="font-mono text-white text-sm">
                  ${tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-mid/20 mt-1">
                <span className="font-display font-bold text-white text-sm uppercase">
                  Total
                </span>
                <span className="font-display font-bold text-xl text-brand-red">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Stripe form ── */}
          <div className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-6">
            <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-6">
              Payment Details
            </p>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  variables: {
                    colorPrimary: "#e53e3e",
                    colorBackground: "#1a1a1a",
                    colorText: "#ffffff",
                    colorDanger: "#e53e3e",
                    borderRadius: "0px",
                  },
                },
              }}
            >
              <StripePaymentForm total={total} subtotal={subtotal} tax={tax} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
}
