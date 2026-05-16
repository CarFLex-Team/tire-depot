"use client";

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

const features = [
  {
    title: "Quality Guaranteed",
    desc: "Every tire we sell meets our strict quality standards",
  },
  {
    title: "Best Prices in Memphis",
    desc: "We match or beat any competitor's price, guaranteed",
  },
  {
    title: "Fast Service",
    desc: "Most installations completed within 30 minutes",
  },
  {
    title: "Expert Team",
    desc: "Certified technicians with years of experience",
  },
];

const stats = [
  { value: "7", label: "Days a Week" },
  { value: "15+", label: "Tire Brands" },
  { value: "100%", label: "Satisfaction" },
  { value: "10+", label: "Years Experience" },
];

export default function AboutSection() {
  const brandRow = [...brands, ...brands];

  return (
    <section
      id="about"
      className="bg-brand-dark py-20 border-t border-brand-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="font-mono text-xs text-brand-red tracking-widest uppercase mb-2">
              Why Tire Depot?
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-6">
              Memphis Trusts
              <br />
              Tire Depot
            </h2>
            <p className="font-body text-brand-muted leading-relaxed mb-10">
              We're not just another tire shop. We're your neighbors who happen
              to be tire experts. With unbeatable prices, fast service, and a
              commitment to quality that keeps our customers coming back.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="border border-brand-gray p-4 hover:border-brand-red/30 transition-colors"
                >
                  <div className="w-6 h-0.5 bg-brand-red mb-3" />
                  <h4 className="font-display font-bold text-sm uppercase tracking-wide text-white mb-1">
                    {f.title}
                  </h4>
                  <p className="font-body text-xs text-brand-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="grid grid-cols-2 gap-px bg-brand-gray mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-brand-dark p-6 flex flex-col items-center text-center"
                >
                  <span className="font-display font-black text-4xl text-white mb-1">
                    {s.value}
                  </span>
                  <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Brand marquee */}
            <div>
              <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-4">
                Brands We Carry
              </p>
              <div className="overflow-hidden border border-brand-gray py-3">
                <div className="marquee-wrapper">
                  <div className="marquee-inner gap-8 pr-8">
                    {brandRow.map((b, i) => (
                      <span
                        key={i}
                        className="font-display font-bold text-xs tracking-widest text-brand-mid hover:text-brand-red transition-colors whitespace-nowrap"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="marquee-inner-2 gap-8 pr-8" aria-hidden>
                    {brandRow.map((b, i) => (
                      <span
                        key={i}
                        className="font-display font-bold text-xs tracking-widest text-brand-mid whitespace-nowrap"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
