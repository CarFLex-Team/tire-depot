const steps = [
  {
    num: "01",
    title: "Browse & Search",
    desc: "Search by tire size, brand, or type. Filter our real inventory to find the perfect tires.",
  },
  {
    num: "02",
    title: "Add to Cart",
    desc: "Choose individual tires or a full set. Add them to your cart with one click.",
  },
  {
    num: "03",
    title: "Checkout & Pay",
    desc: "Secure checkout powered by Square. Pay with any credit or debit card.",
  },
  {
    num: "04",
    title: "Pick Up",
    desc: "Come pick up your tires at our Memphis shop. We'll have them ready for you!",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-brand-charcoal py-20 border-t border-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs text-brand-red tracking-widest uppercase mb-2">
            How It Works
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Order Online, Pick Up Today
          </h2>
          <p className="font-body text-brand-muted mt-3">
            Getting your tires has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center px-4"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+32px)] right-0 h-px bg-brand-gray" />
              )}

              {/* Number circle */}
              <div className="relative z-10 w-14 h-14 border-2 border-brand-red flex items-center justify-center mb-6 bg-brand-charcoal">
                <span className="font-display font-black text-xl text-brand-red">
                  {step.num}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
