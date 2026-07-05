import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const width = url.searchParams.get("width");
  const ratio = url.searchParams.get("ratio");
  const diameter = url.searchParams.get("diameter");
  try {
    const { rows } = await db.query(
      "SELECT * FROM tires WHERE width = $1 AND aspect_ratio = $2 AND rim_diameter = $3 ",
      [width, ratio + ".0", diameter],
    );
    return NextResponse.json({ tires: rows });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch tires" },
      { status: 500 },
    );
  }
}
