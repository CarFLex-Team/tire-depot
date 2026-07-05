"use client";
import CartPanel from "@/components/CartPanel";
import Navbar from "@/components/Navbar";
// import { CartProvider } from "@/lib/cart";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function navLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <CartPanel />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}
