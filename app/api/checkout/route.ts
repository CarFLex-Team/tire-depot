// app/api/checkout/route.ts
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// Need to add check for price and quantity first before creating payment intent to avoid fraud
export async function POST(req: Request) {
  const { cartId, addressId, contact } = await req.json();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cart = await db.query(
    `SELECT id FROM carts WHERE id = $1 AND user_id = $2`,
    [cartId, session.user.id],
  );
  if (cart.rows.length === 0) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }
  // fetch cart items to calculate total
  const cartItems = await db.query(
    `SELECT cart_items.*,cart_items.unit_price AS original_unit_price ,tires.public_price AS unit_price
      FROM cart_items 
      INNER JOIN tires ON tires.id=cart_items.tire_id
      WHERE cart_id = $1`,
    [cartId],
  );

  const subtotalInCents = cartItems.rows.reduce(
    (sum, item) => sum + item.unit_price * 100 * item.quantity,
    0,
  );
  //   const tax = subtotal * 0.0975; // adjust to your rate
  const total = subtotalInCents;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total),
    currency: "usd",
    metadata: {
      cartId,
      userId: contact.userId,
      addressId,
      contactEmail: contact.email,
      contactPhone: contact.phone,
    },
  });
  cookies().set(
    "checkout_session",
    JSON.stringify({
      clientSecret: paymentIntent.client_secret,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30,
      path: "/checkout",
    },
  );
  return NextResponse.json({ ok: true });
}
