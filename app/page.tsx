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

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <CartPanel />
      <main>
        <Hero />
        <MarqueeBanner />
        {/* <ShopSection /> */}
        <ServicesSection />
        <HowItWorksSection />
        {/* <AboutSection /> */}
        <ContactSection />
        <CtaBanner />
      </main>
      <Footer />
    </CartProvider>
  );
}
