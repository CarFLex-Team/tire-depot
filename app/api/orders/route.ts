import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get("user_id");

  try {
    const { rows } = await db.query(
      `SELECT
        orders.*,
        COALESCE(
          (SELECT SUM(order_items.quantity)
           FROM order_items
           WHERE order_items.order_id = orders.id),
          0
        )::int AS item_count
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [user_id],
    );
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
