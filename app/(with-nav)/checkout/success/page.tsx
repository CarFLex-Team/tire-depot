import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";

export default async function CheckoutSuccessPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("checkout_session");
  if (!cookie) redirect("/");

  const { total, subtotal, tax } = JSON.parse(cookie.value);
  //   cookieStore.delete("checkout_session"); // ← clean up
  return <CheckoutSuccessClient total={total} subtotal={subtotal} tax={tax} />;
}
