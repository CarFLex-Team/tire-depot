export default function MarqueeBanner({ items }: { items: string[] }) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4">
      <span className="font-display font-bold text-sm tracking-widest text-brand-red">
        ◆
      </span>
      <span className="font-display font-semibold tracking-widest text-white/50 hover:text-brand-red transition-colors ">
        {item}
      </span>
    </span>
  ));

  return (
    <div className="bg-brand-charcoal border-y border-brand-gray py-3 overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-inner gap-8 pr-8">{content}</div>
        <div className="marquee-inner-2 gap-8 pr-8" aria-hidden>
          {content}
        </div>
      </div>
    </div>
  );
}
