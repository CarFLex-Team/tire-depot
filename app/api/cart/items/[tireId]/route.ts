import { auth } from "@/lib/auth/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

type RouteContext = {
  params: {
    tireId: string;
  };
};

export async function PATCH(req: Request, { params }: RouteContext) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { qty } = await req.json();

  if (!Number.isInteger(qty) || qty < 1) {
    return NextResponse.json(
      { error: "Quantity must be a positive whole number" },
      { status: 400 },
    );
  }

  try {
    const { rows } = await db.query(
      `
        UPDATE cart_items AS cart_item
        SET quantity = $1, unit_price = (SELECT public_price FROM tires WHERE id = $3)
        FROM carts AS cart
        WHERE cart_item.cart_id = cart.id
          AND cart.user_id = $2
          AND cart_item.tire_id = $3
        RETURNING cart_item.*
      `,
      [qty, session.user.id, params.tireId],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: RouteContext) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await db.query(
      `
        DELETE FROM cart_items AS cart_item
        USING carts AS cart
        WHERE cart_item.cart_id = cart.id
          AND cart.user_id = $1
          AND cart_item.tire_id = $2
        RETURNING cart_item.id
      `,
      [session.user.id, params.tireId],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Cart item removed" });
  } catch {
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 },
    );
  }
}
