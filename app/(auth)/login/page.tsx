"use client";
import { Suspense } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import LoginPage from "@/components/LoginPage";

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
        <LoginPage />
      </Suspense>
    </main>
  );
}
