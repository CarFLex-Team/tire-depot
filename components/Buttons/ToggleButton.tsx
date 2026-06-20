export default function ToggleButton({
  selected,
  onClick,
  children,
  disabled = false,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className={`p-1 text-center w-full rounded-full cursor-pointer z-10 disabled:cursor-not-allowed ${selected ? " text-white font-medium" : "text-brand-muted font-body"}  disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
