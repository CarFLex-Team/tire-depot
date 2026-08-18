import { auth } from "@/lib/auth/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await db.query(
      `
        SELECT
          carts.id AS cart_id,
          cart_items.quantity AS cart_quantity,
          cart_items.unit_price AS original_unit_price,
          tires.public_price AS unit_price,
          tires.*
        FROM carts
        INNER JOIN cart_items ON cart_items.cart_id = carts.id
        INNER JOIN tires ON tires.id = cart_items.tire_id
        WHERE carts.user_id = $1
      `,
      [session.user.id],
    );

    return NextResponse.json({
      id: rows[0]?.cart_id ?? null,
      items: rows.map((row) => ({
        qty: row.cart_quantity,
        original_unit_price: Number(row.original_unit_price),
        tire: {
          id: row.id,
          brand: row.brand,
          model: row.model,
          size: row.size,
          width: row.width,
          supplierItemNo: row.supplier_item_no,
          aspectRatio: row.aspect_ratio,
          diameter: Number(row.rim_diameter),
          class: row.tire_class,
          terrain: row.terrain,
          price: Number(row.unit_price),
          priceType: row.price_type,
          inStock: row.in_stock,
          quantity: row.quantity,
          speedRating: row.speed_rating ?? "other",
          imageUrl: row.image_url,
          LoadIndex: row.load_index ?? "other",
        },
      })),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}
