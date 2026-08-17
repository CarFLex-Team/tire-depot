import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";

export default async function CheckoutSuccessPage() {
  // const { total, subtotal, tax } = JSON.parse(cookie.value);
  //   cookieStore.delete("checkout_session"); // ← clean up
  return <CheckoutSuccessClient />;
}
