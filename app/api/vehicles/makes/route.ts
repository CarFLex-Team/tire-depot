import { NextResponse } from "next/server";
import db from "@/lib/db-cars";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    if (!year) {
      return NextResponse.json(
        { error: "Missing required parameter: year" },
        { status: 400 },
      );
    }

    const { rows } = await db.query(
      `
        SELECT DISTINCT make_id, m.name
        FROM vehicle_years
        JOIN makes m ON vehicle_years.make_id = m.id
        WHERE year = $1
        ORDER BY m.name
     `,
      [year],
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/vehicles/makes error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
