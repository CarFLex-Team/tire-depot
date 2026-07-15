import { Cart } from "../cart";

export async function getCart(): Promise<Cart> {
  const response = await fetch("/api/cart");

  if (!response.ok) {
    throw new Error("Unable to load cart");
  }

  return response.json();
}

export async function addCartItem({
  tireId,
  qty,
}: {
  tireId: string;
  qty: number;
}) {
  const response = await fetch("/api/cart/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tireId, qty }),
  });

  if (!response.ok) throw new Error("Unable to add item to cart");
  return response.json();
}

export async function updateCartItem({
  tireId,
  qty,
}: {
  tireId: string;
  qty: number;
}) {
  const response = await fetch(`/api/cart/items/${tireId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty }),
  });

  if (!response.ok) throw new Error("Unable to update cart item");
  return response.json();
}

export async function removeCartItem(tireId: string) {
  const response = await fetch(`/api/cart/items/${tireId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Unable to remove cart item");
}

export async function clearCart() {
  const response = await fetch("/api/cart/items", {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Unable to clear cart");
}
