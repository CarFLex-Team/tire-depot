"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { Phone, ShoppingCart } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerX from "./HamburgerX";
export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    // { label: "Home", href: "#home" },
    { label: "Shop Tires", href: "/tires" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gray"
            : "bg-brand-dark/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}

          <AnimatedLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-sm font-medium text-brand-muted hover:text-white transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href="tel:9017794183"
              className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-brand-red text-white transition-colors"
            >
              <Phone size={14} />
              (901) 779-4183
            </a>

            {/* Cart button */}
            <button
              // onClick={() => dispatch({ type: "SET_OPEN", open: true })}
              className="relative flex items-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white p-2 text-sm font-medium transition-colors rounded-full"
            >
              <ShoppingCart size={20} />

              {totalItems >= 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-brand-red text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <HamburgerX
              onMenuClick={() => setMobileOpen(!mobileOpen)}
              open={mobileOpen}
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.3 } },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-brand-charcoal border-t border-brand-gray px-4 py-8 h-screen"
          >
            <motion.div
              className="flex flex-col items-center gap-9 text-2xl font-medium"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="  rounded-lg hover:bg-white/20 transition"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:9017794183"
                className="text-sm font-medium text-brand-red pt-2"
              >
                (901) 779-4183
              </a>
            </motion.div>
          </motion.div>
        )}
      </header>
    </>
  );
}
