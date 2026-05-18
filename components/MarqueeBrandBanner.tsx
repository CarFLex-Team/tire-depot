export default function MarqueeBrandBanner({ items }: { items: string[] }) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4">
      <span className="font-display text-4xl tracking-widest text-brand-muted/60 hover:text-brand-red transition-colors ">
        {item}
      </span>
    </span>
  ));

  return (
    <div className=" relative py-8 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-l from-brand-dark/0 to-brand-dark pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-brand-dark/0 to-brand-dark pointer-events-none z-20"></div>
      <h2 className="font-display font-bold text-xl  tracking-widest text-white/50 mb-7 text-center">
        BRANDS WE CARRY
      </h2>
      <div className="marquee-wrapper ">
        <div className="marquee-inner gap-8 pr-8">{content}</div>
        <div className="marquee-inner-2 gap-8 pr-8" aria-hidden>
          {content}
        </div>
      </div>
    </div>
  );
}
