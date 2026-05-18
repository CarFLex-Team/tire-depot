import { MapPin } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import FacebookIcon from "./Icons/FacebookIcon";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AnimatedLogo />
            </div>
            <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
              Memphis&apos;s trusted tire shop. Shop tires online, pick up at
              our location. Quality tires, unbeatable prices.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/p/Tire-depot-61559823449146/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-mid flex items-center justify-center text-brand-muted hover:text-brand-red  hover:border-brand-red transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://maps.app.goo.gl/d8Kbg1n3MqMF2i7o6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-mid flex items-center justify-center text-brand-muted  hover:border-brand-red hover:text-brand-red transition-colors"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-xs  text-brand-muted uppercase tracking-widest mb-4">
              Shop
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "All Tires",
                "Passenger Tires",
                "All-Terrain",
                "Mud-Terrain",
                "Trailer Tires",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="/tires"
                    className="font-body text-sm text-brand-muted hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs  text-brand-muted uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "Tire Installation",
                "Wheel Alignment",
                "Tire Rotation",
                "Flat Repair",
                "TPMS Service",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#services"
                    className="font-body text-sm text-brand-muted hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs  text-brand-muted uppercase tracking-widest mb-4">
              Contact / Pickup
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="font-body text-sm text-brand-muted">
                5386 Pleasant View Rd
              </li>
              <li className="font-body text-sm text-brand-muted">
                Memphis, TN 38134
              </li>
              <li>
                <a
                  href="tel:9017794183"
                  className="font-body text-sm text-brand-red hover:text-white transition-colors"
                >
                  (901) 779-4183
                </a>
              </li>
              <li className="font-body text-sm text-brand-muted">
                Open 7 Days a Week
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gray pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="font-display  text-brand-muted">
            © {new Date().getFullYear()} Tire Depot. All Rights Reserved.
          </p>
          {/* <div className="flex gap-4">
            <a
              href="#"
              className="font-display text-xs text-brand-muted hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-display text-xs text-brand-muted hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
