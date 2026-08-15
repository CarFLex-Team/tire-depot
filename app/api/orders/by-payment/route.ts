// app/api/orders/by-payment/route.ts
import db from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get("paymentIntentId");

  if (!paymentIntentId) {
    return new Response("Missing paymentIntentId", { status: 400 });
  }

  const result = await db.query(
    `SELECT 
      o.id,
      o.order_number,
      o.status,
      o.total,
      o.subtotal,
      o.tax,
      o.created_at
     FROM orders o
     INNER JOIN payments p ON p.order_id = o.id
     WHERE p.provider_payment_id = $1
       AND o.user_id = $2`,
    [paymentIntentId, session.user.id],
  );

  if (result.rows.length === 0) {
    return new Response("Order not found", { status: 404 });
  }

  return Response.json({ order: result.rows[0] });
}
