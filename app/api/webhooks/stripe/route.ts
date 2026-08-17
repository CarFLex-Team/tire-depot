import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // aCheck for db columns names
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const existing = await db.query(
      `SELECT id FROM payments WHERE provider_payment_id = $1 AND status = $2`,
      [intent.id, "succeeded"],
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ received: true }, { status: 200 });
    }
    const { cartId, userId, addressId, contactEmail, contactPhone } =
      intent.metadata;

    // fetch cart items before deleting
    const cartItems = await db.query(
      `SELECT *,
      cart_items.quantity as cart_quantity,
      cart_items.unit_price as cart_unit_price,
      tires.public_price AS unit_price  
      FROM cart_items JOIN tires ON cart_items.tire_id = tires.id WHERE cart_id = $1`,
      [cartId],
    );
    if (parseInt(cartItems.rows[0].cart_quantity) === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotalInCents = cartItems.rows.reduce(
      (s, i) => s + Number(i.unit_price) * Number(i.cart_quantity) * 100,
      0,
    );
    const tax = subtotalInCents * 0;
    const totalInCents = subtotalInCents + tax;
    console.log("subtotalInCents", subtotalInCents);
    console.log("tax", tax);
    console.log("totalInCents", totalInCents);

    // generate human-friendly order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // single transaction — all or nothing
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Create order
      const orderResult = await client.query(
        `INSERT INTO orders (
      order_number, user_id, shipping_address_id, status,
      subtotal,tax, total, contact_email, contact_phone
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id`,
        [
          orderNumber,
          userId,
          addressId,
          "paid",
          subtotalInCents / 100,
          tax / 100,
          totalInCents / 100,
          contactEmail,
          contactPhone,
        ],
      );
      const orderId = orderResult.rows[0].id;

      for (const item of cartItems.rows) {
        await client.query(
          `INSERT INTO order_items (
        order_id, tire_id, brand, model, width, ratio, diameter,
        load_index, speed_rating, supplier_item_no,
        quantity, unit_price, line_total
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
          [
            orderId,
            item.tire_id,
            item.brand,
            item.model,
            item.width,
            item.aspect_ratio,
            item.rim_diameter,
            item.load_index,
            item.speed_rating,
            item.supplier_item_no,
            item.cart_quantity,
            item.unit_price,
            item.unit_price * item.cart_quantity,
          ],
        );
      }

      await client.query(
        `INSERT INTO payments (
      order_id, status, amount, currency, provider, provider_payment_id
    ) VALUES ($1,$2,$3,$4,$5,$6)`,
        [orderId, "succeeded", totalInCents / 100, "usd", "stripe", intent.id],
      );

      await client.query(`DELETE FROM cart_items WHERE cart_id = $1`, [cartId]);
      await client.query(`DELETE FROM carts WHERE id = $1`, [cartId]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release(); // always return connection to pool
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object;
    const { cartId, userId } = intent.metadata;

    await db.query(
      `INSERT INTO payments (
      order_id,
      status,
      amount,
      currency,
      provider,
      provider_payment_id,
      provider_metadata
    ) VALUES (NULL, $1, $2, $3, $4, $5, $6)`,
      [
        "failed",
        intent.amount / 100,
        intent.currency,
        "stripe",
        intent.id,
        JSON.stringify({
          failure_code: intent.last_payment_error?.code,
          failure_message: intent.last_payment_error?.message,
          cart_id: cartId,
          user_id: userId,
        }),
      ],
    );
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
