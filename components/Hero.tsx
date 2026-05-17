"use client";
import { ArrowRight, Phone } from "lucide-react";
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

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      {/* Giant background text */}
      {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          className="font-display font-black text-[20vw] text-white/[0.08] tracking-tighter uppercase select-none"
          style={{ lineHeight: 1 }}
        >
          TIRE DEPOT
        </span>
      </div> */}

      <div className="relative z-10 max-w-7xl  px-6 sm:px-8 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 px-4 py-2 mb-6 rounded-full">
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
          <span className="font-anton text-xs text-brand-red tracking-widest uppercase ">
            Memphis&apos;s #1 Tire Shop
          </span>
        </div>

        <h1 className="font-mono  text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-none  mb-6">
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

        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="/tires"
            className="inline-flex items-center gap-3 bg-brand-red hover:shadow-lg hover:shadow-brand-red/50 hover:-translate-y-1 text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-widest transition-transform duration-500 ease-out  rounded-full"
          >
            Shop Tires Now
            <ArrowRight />
          </a>
          <a
            href="tel:9017794183"
            className="inline-flex items-center gap-3 bg-transparent border border-brand-mid hover:border-brand-red hover:text-brand-red transition-transform duration-500 ease-out 
                   hover:-translate-y-1 text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-widest  rounded-full"
          >
            <Phone />
            Call Now
          </a>
        </div>

        <div className="flex flex-wrap gap-12">
          {[
            { value: 500, suffix: "+", label: "Tires In Stock" },
            { value: 15, suffix: "+", label: "Tire Brands" },
            { value: 2000, suffix: "+", label: "Happy Customers" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-mono text-3xl text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-brand-red to-transparent animate-bounce" />
        <span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">
          Scroll to Shop
        </span>
      </div>
    </section>
  );
}
