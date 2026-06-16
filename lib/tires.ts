export interface Tire {
  id: string;
  brand: string;
  model: string;
  size: string;
  width?: number; //tire width in mm
  supplierItemNo: string;
  aspectRatio?: number; //aspect ratio as percentage
  diameter: number; //rim_diameter in inches
  class: string; //tire_class
  terrain: string;
  price: number; //public_price
  priceType: "per set" | "each";
  inStock: boolean; // in_stock
  quantity: number;
  speedRating: string;
  imageUrl: string;
  LoadIndex: string;
}

// export const BRANDS = [...new Set(TIRES.map((t) => t.brand))].sort();
// export const TYPES = [...new Set(TIRES.map((t) => t.terrain))].sort();
// export const DIAMETERS = [...new Set(TIRES.map((t) => t.diameter))].sort(
//   (a, b) => a - b,
// );
