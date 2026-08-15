"use client";

import Link from "next/link";
import { ArrowLeft, Package, Loader2, AlertCircle } from "lucide-react";
import { getOrderById, OrderItem } from "@/lib/api/orders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-950/60 border-amber-700 text-amber-400",
  paid: "bg-blue-950/60 border-blue-700 text-blue-400",
  fulfilled: "bg-emerald-950/60 border-emerald-700 text-emerald-400",
  cancelled: "bg-red-950/60 border-red-800 text-brand-red",
  refunded: "bg-brand-charcoal border-brand-mid text-brand-muted",
};

const formatCurrency = (amount: number | string | null | undefined) =>
  `$${Number(amount ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function OrderPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params?.orderId;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    retry: 1,
  });

  console.log("order data:", data);

  if (isLoading) {
    return (
      <main className="bg-brand-dark min-h-screen py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/account?tab=orders"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-brand-muted hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
            <Loader2 size={32} className="text-brand-red animate-spin mb-4" />

            <p className="font-display text-sm uppercase tracking-widest text-brand-muted">
              Loading Order...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------
  if (isError) {
    return (
      <main className="bg-brand-dark min-h-screen py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/account?tab=orders"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-brand-muted hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-red-950/40 border border-red-800/50 flex items-center justify-center mb-5">
              <AlertCircle size={26} className="text-brand-red" />
            </div>

            <h1 className="font-mono text-xl text-white uppercase mb-2">
              Unable to Load Order
            </h1>

            <p className="font-body text-brand-muted text-sm max-w-md">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading this order."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Order not found
  // -----------------------------
  if (!data) {
    return (
      <main className="bg-brand-dark min-h-screen py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/account?tab=orders"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-brand-muted hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
            <Package size={40} className="text-brand-muted mb-5" />

            <h1 className="font-mono text-xl text-white uppercase mb-2">
              Order Not Found
            </h1>

            <p className="font-body text-brand-muted text-sm">
              We couldn&apos;t find the order you&apos;re looking for.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-brand-dark min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/account?tab=orders"
          className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-brand-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10">
          <div>
            <p className="font-display text-brand-red tracking-widest uppercase text-sm mb-1">
              Order Details
            </p>

            <h1 className="font-mono text-3xl sm:text-4xl text-white uppercase">
              {data.order.order_number}
            </h1>

            <p className="font-body text-brand-muted text-sm mt-2">
              Placed {formatDate(data.order.created_at)}
            </p>
          </div>

          <span
            className={`w-fit font-display text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              STATUS_STYLES[data.order.status] ?? STATUS_STYLES.pending
            }`}
          >
            {data.order.status}
          </span>
        </div>

        <section className="bg-brand-charcoal/40 border border-brand-mid/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Package size={20} className="text-brand-red" />

            <h2 className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              Items Ordered
            </h2>
          </div>

          {data.items?.length ? (
            <div className="flex flex-col divide-y divide-brand-mid/20">
              {data.items.map((item: OrderItem) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-display font-bold text-white text-sm uppercase">
                      {item.brand} {item.model}
                    </p>

                    <p className="font-mono text-brand-muted text-xs mt-1">
                      {item.width}/{item.ratio}R{item.diameter}
                    </p>

                    <p className="font-mono text-brand-muted text-xs mt-1">
                      Qty {item.quantity} × {formatCurrency(item.unit_price)}
                    </p>
                  </div>

                  <span className="font-mono text-white text-sm flex-shrink-0">
                    {formatCurrency(item.line_total)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="font-body text-sm text-brand-muted">
                No items found for this order.
              </p>
            </div>
          )}

          <div className="border-t border-brand-mid/20 pt-5 mt-6 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-body text-brand-muted text-sm">
                Subtotal
              </span>

              <span className="font-mono text-white text-sm">
                {formatCurrency(data.order.subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-body text-brand-muted text-sm">Tax</span>

              <span className="font-mono text-white text-sm">
                {formatCurrency(data.order.tax)}
              </span>
            </div>

            <div className="flex justify-between pt-3 border-t border-brand-mid/20 mt-1">
              <span className="font-display font-bold text-white text-sm uppercase">
                Total
              </span>

              <span className="font-display font-bold text-xl text-brand-red">
                {formatCurrency(data.order.total)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
