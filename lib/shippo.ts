// lib/shippo.ts
import { Shippo } from "shippo";

const shippo = new Shippo({ apiKeyHeader: process.env.SHIPPO_API_KEY! });

const WAREHOUSE = {
  name: "Tire Depot",
  street1: "5386 Pleasant View Rd",
  city: "Memphis",
  state: "TN",
  zip: "38134",
  country: "US",
};

export async function getShippingRate(
  toZip: string,
  weightLbs: number,
): Promise<number> {
  try {
    const shipment = await shippo.shipments.create({
      addressFrom: WAREHOUSE,
      addressTo: {
        name: "Customer",
        street1: "5386 Pleasant View Rd",
        city: "Memphis",
        state: "TN",
        zip: toZip,
        country: "US",
      },
      parcels: [
        {
          // average single tire dimensions
          length: "28",
          width: "10",
          height: "28",
          distanceUnit: "in",
          weight: weightLbs.toString(),
          massUnit: "lb",
        },
      ],
      async: false,
    });
    console.log("Shippo shipment created:", shipment);
    // pick cheapest UPS rate
    const rates = shipment.rates ?? [];
    const upsRates = rates.filter((r: any) =>
      r.attributes?.includes("CHEAPEST"),
    );

    const best = upsRates[0] ?? rates[0];
    console.log("Best shipping rate:", best?.amount, best?.currency);
    return best ? parseFloat(best.amount) : 0;
  } catch {
    console.error("Error fetching shipping rate from Shippo");
    return 0; // fail silently, show tire price without shipping
  }
}
