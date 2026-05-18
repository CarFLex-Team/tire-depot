import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import ShopSection from "@/components/ShopSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import MarqueeBrandBanner from "@/components/MarqueeBrandBanner";
const typeItems = [
  "SHOP ONLINE",
  "FREE PICKUP",
  "ALL-SEASON TIRES",
  "MUD-TERRAIN",
  "ALL-TERRAIN",
  "TRAILER TIRES",
  "PASSENGER TIRES",
  "TIRE INSTALLATION",
];
const brands = [
  "ZETA",
  "ROADONE",
  "COSMO",
  "GOODRIDE",
  "MASTERTRACK",
  "FREEDOM",
  "CENTARA",
  "ZEETEX",
  "BLACKHAWK",
  "LIONHART",
  "LIONSPORT",
  "PETLAS",
  "HAIDA",
  "FORTUNE",
];

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner items={typeItems} />
      {/* <ShopSection /> */}
      <ServicesSection />
      <HowItWorksSection />
      <AboutSection />
      <MarqueeBrandBanner items={brands} />

      <ContactSection />
      <CtaBanner />
    </main>
  );
}
