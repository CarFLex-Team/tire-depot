import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anton.variable}>{children}</body>
    </html>
  );
}
