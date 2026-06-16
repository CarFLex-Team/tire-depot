export type AccordionKey = "brand" | "type" | "load" | "price" | "speed";
export function AccordionSection({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: AccordionKey;
  label: string;
  open: boolean;
  onToggle: (id: AccordionKey) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-brand-charcoal">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-6 py-4 text-left text-brand-light hover:bg-white/5 transition-colors"
      >
        <span className="font-display font-semibold text-base">{label}</span>
        <svg
          className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-6 pb-5">{children}</div>}
    </div>
  );
}
