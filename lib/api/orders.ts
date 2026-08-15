export type Order = {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  item_count?: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  brand: string;
  model: string;
  width: number;
  ratio: number;
  diameter: number;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export async function getOrders(userId: string) {
  const res = await fetch(`/api/orders?user_id=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}
export async function getOrderById(orderId: string) {
  console.log("Fetching order with ID:", orderId);
  const res = await fetch(`/api/orders/${orderId}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}
