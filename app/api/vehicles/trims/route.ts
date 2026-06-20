import { NextResponse } from "next/server";
import db from "@/lib/db-cars";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    const make = url.searchParams.get("make");
    const model = url.searchParams.get("model");
    if (!year || !make || !model) {
      return NextResponse.json(
        { error: "Missing required parameter: year or make or model" },
        { status: 400 },
      );
    }

    const { rows } = await db.query(
      `
       SELECT  v.id,v.trim_id, t.name
        FROM vehicle_years v
        JOIN trims t ON v.trim_id = t.id
        WHERE year = $1 AND make_id = $2 AND model_id=$3
        ORDER BY t.name
     `,
      [year, make, model],
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/vehicles/trims error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
