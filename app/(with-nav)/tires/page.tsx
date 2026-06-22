"use client";
import { Suspense } from "react";
import ShopSection from "@/components/ShopSection";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function TiresPage() {
  return (
    <main className="min-h-screen ">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <AnimatedLogo withText={false} width={20} height={20} />
          </div>
        }
      >
        <ShopSection />
      </Suspense>
    </main>
  );
}
