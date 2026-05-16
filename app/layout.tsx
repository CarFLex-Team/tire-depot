import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
