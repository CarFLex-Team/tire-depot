import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { rows } = await db.query("SELECT * FROM tires WHERE id = $1", [id]);
    return NextResponse.json({ tire: rows[0] });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch tire" },
      { status: 500 },
    );
  }
}
