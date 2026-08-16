"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { MapPin, ShoppingCart, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import AnimatedLogo from "./AnimatedLogo";
import { motion } from "framer-motion";
import HamburgerX from "./HamburgerX";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/lib/api/addresses";
import Modal from "./Modals/Modal";
import AddAddressForm from "./Forms/AddAddressForm";
import { useCartUiStore } from "@/lib/store/cart-ui";
export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { totalItems } = useCart(session?.user?.id ?? "");
  const { openCart } = useCartUiStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [addrOpen, setAddrOpen] = useState(false);
  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["addresses", session?.user?.id],
    queryFn: () => getAddresses(session?.user?.id || ""),
    enabled: !!session?.user?.id,
  });
  // console.log("addresses in Navbar:", addresses);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    // { label: "Home", href: "#home" },
    { label: "Shop Tires", href: "/#search-section" },
    { label: "Service", href: "/#how-it-works" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <Modal
        isOpen={addrOpen}
        onClose={() => {
          setAddrOpen(false);
        }}
      >
        <AddAddressForm
          onClose={() => setAddrOpen(false)}
          userId={session?.user?.id}
        />
      </Modal>
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gray"
            : "bg-brand-dark/50"
        }`}
      >
        <div className=" mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
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

          <div className="flex items-center sm:gap-4 gap-1">
            <div
              onClick={() => {
                addresses.length <= 0
                  ? setAddrOpen(true)
                  : router.push("/account?tab=addresses");
              }}
              className="hidden md:flex  items-center gap-2 text-sm font-medium cursor-pointer hover:text-brand-red text-white transition-colors"
            >
              <MapPin size={14} />
              {addresses.length > 0 && !addrLoading
                ? addresses[0].label
                : "Add Address"}
            </div>
            {session ? (
              <div
                onClick={() => router.push("/account?tab=profile")}
                className="w-10 h-10 rounded-full bg-brand-charcoal border border-brand-mid/30 flex items-center justify-center font-display font-bold text-brand-red hover:text-white transition-colors cursor-pointer"
              >
                {session.user?.name
                  ? `${session.user.name[0] ?? ""}${session.user.last_name?.[0] ?? ""}`.toUpperCase()
                  : "?"}
              </div>
            ) : (
              <div
                className=" flex items-center gap-2 text-sm font-medium hover:text-brand-red text-white transition-colors cursor-pointer"
                onClick={() => !isPending && router.push("/login")}
              >
                <UserRound size={20} />
                <span className=" max-[320px]:hidden">Sign In</span>
              </div>
            )}

            <button
              onClick={openCart}
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

              <div
                onClick={() => {
                  addresses.length <= 0
                    ? setAddrOpen(true)
                    : router.push("/account?tab=addresses");
                }}
                className="text-sm font-medium text-brand-red pt-2 flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
              >
                <MapPin size={14} />
                {addresses.length > 0 && !addrLoading
                  ? addresses[0].postal_code
                  : "Add Address"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </header>
    </>
  );
}
