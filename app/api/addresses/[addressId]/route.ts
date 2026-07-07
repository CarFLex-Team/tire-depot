import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ addressId: string }> },
) {
  try {
    const { addressId } = await context.params;
    await db.query("DELETE FROM addresses WHERE id = $1 RETURNING *", [
      addressId,
    ]);
    return NextResponse.json(
      { message: "Address deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 },
    );
  }
}
export async function PUT(
  _req: Request,
  context: { params: Promise<{ addressId: string }> },
) {
  try {
    const { addressId } = await context.params;
    const body = await _req.json();
    await db.query(
      "UPDATE addresses SET label = $2, line1 = $3, line2 = $4, city = $5, state = $6, postal_code = $7 WHERE id = $1 RETURNING *",
      [
        addressId,
        body.label,
        body.line1,
        body.line2,
        body.city,
        body.state,
        body.postal_code,
      ],
    );
    return NextResponse.json(
      { message: "Address updated successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 },
    );
  }
}
