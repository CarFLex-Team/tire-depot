export default function MarqueeBanner() {
  const items = [
    "SHOP ONLINE",
    "FREE PICKUP",
    "ALL-SEASON TIRES",
    "MUD-TERRAIN",
    "ALL-TERRAIN",
    "TRAILER TIRES",
    "PASSENGER TIRES",
    "TIRE INSTALLATION",
  ];

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4">
      <span className="font-display font-bold text-sm tracking-widest text-brand-red">
        ◆
      </span>
      <span className="font-display font-bold text-sm tracking-widest text-white">
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
