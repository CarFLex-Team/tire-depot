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
export async function getTires(
  width: number,
  ratio: number,
  diameter: number,
): Promise<Tire[]> {
  const res = await fetch(
    `/api/tires?width=${width}&ratio=${ratio}&diameter=${diameter}`,
  );
  if (!res.ok) throw new Error("Failed to fetch tires");
  const data = await res.json();
  return data.tires.map((t: any) => ({
    ...t,
    speedRating: t.speed_rating === null ? "other" : t.speed_rating,
    supplierItemNo: t.supplier_item_no,
    LoadIndex: t.load_index === null ? "other" : t.load_index,
    imageUrl: t.image_url,
    inStock: t.in_stock,
    class: t.tire_class,
    diameter: parseInt(t.rim_diameter),
    price: parseFloat(t.public_price),
  }));
}
export async function getTireById(tireId: string): Promise<Tire> {
  const res = await fetch(`/api/tires/${tireId}`);
  if (!res.ok) throw new Error("Not found");
  const data = await res.json();
  const t = data.tire;
  return {
    ...t,
    speedRating: t.speed_rating === null ? "other" : t.speed_rating,
    supplierItemNo: t.supplier_item_no,
    LoadIndex: t.load_index === null ? "other" : t.load_index,
    imageUrl: t.image_url,
    inStock: t.in_stock,
    class: t.tire_class,
    diameter: parseInt(t.rim_diameter),
    price: parseFloat(t.public_price),
    aspectRatio: parseInt(t.aspect_ratio),
  };
}
