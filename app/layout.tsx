import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import CartPanel from "@/components/CartPanel";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/lib/cart";
import Footer from "@/components/Footer";
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Tire Depot | Shop Tires Online - Memphis, TN",
  description:
    "Tire Depot - Shop tires online with in-store pickup in Memphis, TN. Premium tires, unbeatable prices. Browse inventory & order now!",
  keywords: "tires, Memphis, TN, tire shop, buy tires online, tire pickup",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anton.variable}>
        <CartProvider>
          <Navbar />
          <CartPanel />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
