import { useState } from 'react';

export function WishlistButton({ initialChecked = false, className = '', ...props }) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const toggle = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
  };

  return (
    <button 
      type="button"
      aria-label="Toggle wishlist"
      className={`wishlist-btn w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-outline-variant/30 active:scale-95 transition-transform ${isChecked ? 'is-active text-tertiary-container' : 'text-on-surface'} ${className}`}
      onClick={toggle}
      {...props}
    >
      <span className="material-symbols-outlined text-[20px] transition-colors" style={{ fontVariationSettings: isChecked ? "'FILL' 1" : "'FILL' 0" }}>
        favorite
      </span>
    </button>
  );
}
