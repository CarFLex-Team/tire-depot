import { auth } from "@/lib/auth/auth";
import db from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(
  _req: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { orderId } = await context.params;

  try {
    const { rows: orders } = await db.query(
      `SELECT id, order_number, status, subtotal, tax, total, created_at
     FROM orders
     WHERE id = $1 AND user_id = $2`,
      [orderId, session.user.id],
    );

    const order = orders[0];
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { rows: items } = await db.query(
      `SELECT id, brand, model, width, ratio, diameter, quantity, unit_price, line_total
     FROM order_items
     WHERE order_id = $1
     ORDER BY id`,
      [order.id],
    );

    return NextResponse.json({ order, items });
  } catch (err) {
    console.error("Error fetching order:", err);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}
