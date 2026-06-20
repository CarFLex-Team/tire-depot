import {
  ArrowRight,
  Clock,
  LifeBuoy,
  Monitor,
  RefreshCcw,
  Shield,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: <Monitor size={28} />,
    title: "Online Tire Shop",
    desc: "Browse our full inventory, add to cart, and check out online. Pick up at our Memphis location.",
    cta: "Shop Now",
    href: "/#search-section",
  },
  {
    icon: <LifeBuoy size={28} />,
    title: "Wheel Alignment",
    desc: "Precision alignment to ensure even tire wear and optimal handling performance.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: <Wrench size={28} />,
    title: "Tire Installation",
    desc: "Fast, professional mounting and balancing. In and out in no time with expert care.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: <RefreshCcw size={28} />,
    title: "Tire Rotation",
    desc: "Regular rotation extends tire life and keeps your ride smooth and balanced.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: <Shield size={28} />,
    title: "Flat Repair",
    desc: "Quick and reliable flat tire repair. Get back on the road safely and affordably.",
    cta: "Learn More",
    href: "#contact",
  },
  {
    icon: <Clock size={28} />,
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
        <div className="mb-12 text-center">
          <p className="font-display text-lg text-brand-red tracking-widest uppercase mb-2">
            What We Do
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Our <span className="text-brand-red">Services</span>
          </h2>
          <p className="font-body text-brand-muted mt-2">
            Complete tire solutions for every vehicle and every budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group p-8 flex flex-col gap-4 transition-colors bg-brand-gray hover:bg-brand-charcoal
                rounded-lg cursor-pointer h-full
              }`}
            >
              <div className={"text-brand-red"}>{s.icon}</div>
              <div>
                <h3
                  className={`font-display font-bold text-xl uppercase tracking-wide mb-2 "text-white" : "text-white"`}
                >
                  {s.title}
                </h3>
                <p
                  className={`font-body text-sm leading-relaxed "text-white/80" : "text-brand-muted"`}
                >
                  {s.desc}
                </p>
              </div>
              <a
                href={s.href}
                className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mt-auto transition-all
                                     text-brand-red hover:text-white hover:gap-3
                }`}
              >
                {s.cta}
                <ArrowRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
