"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { Phone, ShoppingCart } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

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
    { label: "Home", href: "#home" },
    { label: "Shop Tires", href: "#shop" },
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
            {/* <button
              onClick={() => dispatch({ type: "SET_OPEN", open: true })}
              className="relative flex items-center gap-2 bg-brand-red hover:bg-[#cc1215] text-white px-4 py-2 text-sm font-medium transition-colors rounded-full"
            >
              <ShoppingCart size={16} />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-brand-red text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button> */}

            {/* Mobile menu */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-charcoal border-t border-brand-gray px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm font-medium text-brand-light hover:text-brand-red transition-colors py-2 border-b border-brand-gray"
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
          </div>
        )}
      </header>
    </>
  );
}
