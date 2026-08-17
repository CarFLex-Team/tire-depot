import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";
import AnimatedLogo from "@/components/AnimatedLogo";
import { Suspense } from "react";

export default async function CheckoutSuccessPage() {
  // const { total, subtotal, tax } = JSON.parse(cookie.value);
  //   cookieStore.delete("checkout_session"); // ← clean up
  return (
    <main className="bg-brand-dark min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <AnimatedLogo withText={false} width={20} height={20} />
          </div>
        }
      >
        <CheckoutSuccessClient />;
      </Suspense>
    </main>
  );
}
