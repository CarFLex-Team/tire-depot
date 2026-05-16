export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="logo"
                className="animate-spinSlow w-10 h-10"
              />
              <span className="font-display font-black text-xl tracking-widest text-white uppercase">
                Tire Depot
              </span>
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
                className="w-9 h-9 border border-brand-mid flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-red transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://maps.app.goo.gl/d8Kbg1n3MqMF2i7o6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-mid flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-red transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-4">
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
                    href="#shop"
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
            <h4 className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-4">
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
            <h4 className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-4">
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

        <div className="border-t border-brand-gray pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-brand-muted">
            © {new Date().getFullYear()} Tire Depot. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="font-mono text-xs text-brand-muted hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-mono text-xs text-brand-muted hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
