"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { authClient } from "@/lib/auth/auth-client";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
}

export default function CheckoutSuccessClient({
  total,
  subtotal,
  tax,
}: {
  total: number;
  subtotal: number;
  tax: number;
}) {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const { data: session } = authClient.useSession();
  const { items, clearCart } = useCart(session?.user?.id ?? "");

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!paymentIntentId || hasRun.current) {
      return;
    }
    hasRun.current = true;
    async function verify() {
      const delays = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
      for (const delay of delays) {
        await new Promise((r) => setTimeout(r, delay));

        try {
          const res = await fetch(
            `/api/orders/by-payment?paymentIntentId=${paymentIntentId}`,
          );

          if (res.ok) {
            const data = await res.json();
            setOrder(data.order);
            clearCart();
            setLoading(false);
            return;
          }
        } catch {}
      }
      setError(true);
      setLoading(false);
    }

    verify();
  }, [paymentIntentId]);

  if (loading) {
    return (
      <main className="bg-brand-dark min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs text-brand-muted uppercase tracking-widest animate-pulse">
            Confirming your order...
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="bg-brand-dark min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-brand-red text-2xl font-mono">!</span>
          </div>
          <p className="font-display text-brand-red text-xl uppercase tracking-widest mb-3">
            Something went wrong
          </p>
          <p className="font-body text-brand-muted text-sm leading-relaxed mb-2">
            Your payment was successful but we had trouble confirming your
            order. Please contact us with your payment reference:
          </p>
          <p className="font-mono text-white text-xs bg-brand-charcoal border border-brand-mid/20 rounded-lg px-4 py-3 break-all">
            {paymentIntentId ?? "—"}
          </p>
          <a
            href="/"
            className="inline-block mt-8 font-display text-sm uppercase tracking-widest text-brand-red hover:underline"
          >
            Go Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-brand-dark min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* Confirmed banner */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center">
            <CheckCircle2 size={36} className="text-emerald-400" />
          </div>
          <div>
            <p className="font-display text-brand-red tracking-widest uppercase text-sm mb-1">
              Payment Confirmed
            </p>
            <h1 className="font-mono text-3xl sm:text-4xl text-white uppercase">
              Order Placed!
            </h1>
            {/* <p className="font-body text-brand-muted text-sm mt-3">
              We'll contact you when your tires are ready.
            </p> */}
          </div>
        </div>

        {/* Order number */}
        <div className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-brand-red flex-shrink-0" />
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-brand-muted mb-0.5">
                Order Number
              </p>
              <p className="font-display text-white text-xl font-bold">
                {order.order_number}
              </p>
            </div>
          </div>
          <span
            className={`font-display text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-emerald-950/60 border-emerald-700 text-emerald-400`}
          >
            {order.status}
          </span>
        </div>

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
                    {tire.width}/{tire.aspectRatio}R{tire.diameter} · Qty {qty}
                  </p>
                </div>
                <span className="font-mono text-white text-sm flex-shrink-0">
                  ${(tire.price * qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

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

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/account?tab=orders"
            className="flex-1 flex items-center justify-center gap-2 py-4 font-display font-bold text-sm uppercase tracking-widest border border-brand-mid text-brand-muted hover:border-brand-red hover:text-brand-red transition-colors rounded-xl"
          >
            View Orders
          </a>
          <a
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-4 font-display font-bold text-sm uppercase tracking-widest bg-brand-red text-white hover:brightness-110 transition-all rounded-xl"
          >
            Shop More <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </main>
  );
}
