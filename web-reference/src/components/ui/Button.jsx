export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center h-11 px-space-lg font-label-lg text-label-lg uppercase tracking-wider rounded-xl active:scale-[0.985] transition-all";
  
  const variants = {
    primary: "bg-primary-container text-on-primary hover:bg-[#003380]",
    secondary: "bg-on-surface text-surface",
    ghost: "bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-low"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
