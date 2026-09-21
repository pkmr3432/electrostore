export function CategoryPill({ label, isActive, onClick }) {
  const baseClasses = "px-space-md py-space-xs rounded-full font-label-md text-label-md tracking-wider uppercase transition-all";
  const activeClasses = isActive 
    ? "bg-on-surface text-surface" 
    : "bg-surface-container-low text-secondary hover:text-on-surface";

  return (
    <button type="button" className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      {label}
    </button>
  );
}
