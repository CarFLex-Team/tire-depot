// app/api/shipping/rate/route.ts
import { getShippingRate } from "@/lib/shippo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get("zip");
  const weight = parseFloat(searchParams.get("weight") ?? "25"); // default 25 lbs per tire

  if (!zip || zip.length !== 5) {
    return Response.json({ rate: 0 });
  }

  const rate = await getShippingRate(zip, weight);
  console.log(
    `Shipping rate for zip ${zip} and weight ${weight} lbs: $${rate}`,
  );
  return Response.json({ rate });
}
