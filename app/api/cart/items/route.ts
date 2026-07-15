import { auth } from "@/lib/auth/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tireId, qty } = await req.json();
  const userId = session.user.id;
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { rows: cartRows } = await client.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [userId],
    );
    if (cartRows.length === 0) {
      await client.query("INSERT INTO carts (user_id) VALUES ($1)", [userId]);
    }
    const { rows: itemRows } = await client.query(
      "SELECT * FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1) AND tire_id = $2",
      [userId, tireId],
    );
    if (itemRows.length === 0) {
      await client.query(
        "INSERT INTO cart_items (cart_id, tire_id, quantity, unit_price) VALUES ((SELECT id FROM carts WHERE user_id = $1), $2, $3, (SELECT public_price FROM tires WHERE id = $2))",
        [userId, tireId, qty],
      );
    } else {
      await client.query(
        "UPDATE cart_items SET quantity = $1, unit_price = (SELECT public_price FROM tires WHERE id = $3) WHERE cart_id = (SELECT id FROM carts WHERE user_id = $2) AND tire_id = $3",
        [qty + itemRows[0].quantity, userId, tireId],
      );
    }

    await client.query("COMMIT");
    return NextResponse.json(
      { message: "Item added to cart" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    await client.query("ROLLBACK");
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
export async function DELETE(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db.query(
      `
        DELETE FROM cart_items
        WHERE cart_id = (
          SELECT id
          FROM carts
          WHERE user_id = $1
        )
      `,
      [session.user.id],
    );

    return NextResponse.json({
      message: "Cart cleared",
      deletedItems: result.rowCount ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 },
    );
  }
}
