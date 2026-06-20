import { NextResponse } from "next/server";
import db from "@/lib/db-cars";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    const make = url.searchParams.get("make");
    if (!year || !make) {
      return NextResponse.json(
        { error: "Missing required parameter: year or make" },
        { status: 400 },
      );
    }

    const { rows } = await db.query(
      `
        SELECT DISTINCT model_id, m.name
        FROM vehicle_years
        JOIN models m ON vehicle_years.model_id = m.id
        WHERE year = $1 AND make_id = $2
        ORDER BY m.name
     `,
      [year, make],
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/vehicles/models error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
