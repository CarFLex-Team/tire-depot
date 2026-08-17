import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutClient from "@/components/CheckoutClient";

export default function CheckoutPage() {
  const cookie = cookies().get("checkout_session");
  if (!cookie) redirect("/");

  const { clientSecret } = JSON.parse(cookie.value);

  return <CheckoutClient clientSecret={clientSecret} />;
}
