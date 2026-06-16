export function CheckboxOption({
  label,
  count,
  description,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  description?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-start gap-3 py-2 cursor-pointer group">
      <div
        onClick={onChange}
        className={`mt-0.5 w-[18px] h-[18px] flex-shrink-0 rounded border transition-colors duration-150 flex items-center justify-center
          ${checked ? "bg-brand-red border-brand-red" : "border-brand-mid group-hover:border-brand-muted"}`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0" onClick={onChange}>
        <div className="flex items-baseline gap-1.5">
          <span className="font-body text-sm text-brand-light">{label}</span>
          <span className="font-body text-xs text-brand-muted">({count})</span>
        </div>
        {description && (
          <p className="font-body text-xs text-brand-muted mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
    </label>
  );
}
