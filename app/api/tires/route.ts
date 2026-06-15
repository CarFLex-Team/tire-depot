import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const { rows } = await db.query("SELECT * FROM tires_new LIMIT 100");
    return NextResponse.json({ tires: rows });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch tires" },
      { status: 500 },
    );
  }
}
