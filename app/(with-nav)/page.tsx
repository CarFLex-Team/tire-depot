import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";

import MarqueeBrandBanner from "@/components/MarqueeBrandBanner";
import SearchSection from "@/components/SearchSection";
const typeItems = [
  "SHOP ONLINE",
  "DELIVERED TO YOU",
  "TRUCK TIRES",
  "ALL-SEASON TIRES",
  "MUD-TERRAIN",
  "ALL-TERRAIN",
  "TRAILER TIRES",
  "PASSENGER TIRES",
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
      <SearchSection />
      {/* <ServicesSection /> */}
      <HowItWorksSection />
      <AboutSection />
      <MarqueeBrandBanner items={brands} />

      <ContactSection />
      <CtaBanner />
    </main>
  );
}
