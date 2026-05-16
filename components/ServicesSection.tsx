const services = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Online Tire Shop",
    desc: "Browse our full inventory, add to cart, and check out online. Pick up at our Memphis location.",
    cta: "Shop Now",
    href: "#shop",
    featured: true,
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: "Wheel Alignment",
    desc: "Precision alignment to ensure even tire wear and optimal handling performance.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Tire Installation",
    desc: "Fast, professional mounting and balancing. In and out in no time with expert care.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Tire Rotation",
    desc: "Regular rotation extends tire life and keeps your ride smooth and balanced.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Flat Repair",
    desc: "Quick and reliable flat tire repair. Get back on the road safely and affordably.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "TPMS Service",
    desc: "Tire pressure monitoring system diagnostics, sensor replacement, and calibration.",
    cta: "Learn More",
    href: "#contact",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-brand-dark py-20 border-t border-brand-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="font-mono text-xs text-brand-red tracking-widest uppercase mb-2">
            What We Do
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Our Services
          </h2>
          <p className="font-body text-brand-muted mt-2">
            Complete tire solutions for every vehicle and every budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-gray">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group p-8 flex flex-col gap-4 transition-colors ${
                s.featured
                  ? "bg-brand-red hover:bg-[#cc1215]"
                  : "bg-brand-dark hover:bg-brand-charcoal"
              }`}
            >
              <div className={s.featured ? "text-white" : "text-brand-red"}>
                {s.icon}
              </div>
              <div>
                <h3
                  className={`font-display font-bold text-xl uppercase tracking-wide mb-2 ${s.featured ? "text-white" : "text-white"}`}
                >
                  {s.title}
                </h3>
                <p
                  className={`font-body text-sm leading-relaxed ${s.featured ? "text-white/80" : "text-brand-muted"}`}
                >
                  {s.desc}
                </p>
              </div>
              <a
                href={s.href}
                className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mt-auto transition-colors ${
                  s.featured
                    ? "text-white hover:text-white/70"
                    : "text-brand-red hover:text-white"
                }`}
              >
                {s.cta}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
