"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import AccountSection from "@/components/AccountSection";

export default function AccountPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  }
  if (!session && !isPending) {
    router.push("/");
    return null;
  }
  return (
    <main className="bg-brand-dark min-h-screen">
      <AccountSection
        user={session?.user ?? null}
        loading={isPending}
        onLogout={handleLogout}
      />
    </main>
  );
}
