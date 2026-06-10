import CartPanel from "@/components/CartPanel";
import Navbar from "@/components/Navbar";
// import { CartProvider } from "@/lib/cart";
import Footer from "@/components/Footer";

export default function navLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartPanel />
      {children}
      <Footer />
    </>
  );
}
