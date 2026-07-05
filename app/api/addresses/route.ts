import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get("user_id");

  try {
    const { rows } = await db.query(
      "SELECT * FROM addresses WHERE user_id = $1",
      [user_id],
    );
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { rows } = await db.query(
      "INSERT INTO addresses (user_id, label, line1, line2, city, state, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        body.user_id,
        body.label,
        body.line1,
        body.line2,
        body.city,
        body.state,
        body.postal_code,
      ],
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 },
    );
  }
}
