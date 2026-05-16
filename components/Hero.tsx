"use client";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 20);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-dark"
    >
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "url('/hero_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          className="font-display font-black text-[20vw] text-white/[0.02] tracking-tighter uppercase select-none"
          style={{ lineHeight: 1 }}
        >
          TIRES
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 px-3 py-1 mb-6">
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
          <span className="font-mono text-xs text-brand-red tracking-widest uppercase">
            Memphis's #1 Tire Shop
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-none tracking-tight mb-6">
          Shop Tires.
          <br />
          <span className="text-brand-red">Order Online.</span>
          <br />
          Pick Up Today.
        </h1>

        <p className="font-body text-lg text-brand-muted max-w-xl mb-10 leading-relaxed">
          Browse our real inventory, add to cart, and check out online. Pick up
          at our Memphis location — fast, easy, and at unbeatable prices.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#shop"
            className="inline-flex items-center gap-3 bg-brand-red hover:bg-[#cc1215] text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-widest transition-colors"
          >
            Shop Tires Now
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="tel:9017794183"
            className="inline-flex items-center gap-3 bg-transparent border border-brand-mid hover:border-brand-red text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-widest transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            Call Now
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12">
          {[
            { value: 500, suffix: "+", label: "Tires In Stock" },
            { value: 15, suffix: "+", label: "Tire Brands" },
            { value: 2000, suffix: "+", label: "Happy Customers" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-black text-4xl text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">
          Scroll to Shop
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-muted to-transparent animate-bounce" />
      </div>
    </section>
  );
}
