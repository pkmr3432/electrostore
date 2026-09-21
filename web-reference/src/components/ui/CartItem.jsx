export function CartItem({
  id,
  index,
  title,
  manufacturer,
  specs,
  price,
  imageUrl,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <article className="group flex flex-col pb-space-md transition-all duration-300">
      <div className="flex gap-space-md items-center">
        <div className="relative w-[76px] h-[76px] rounded-xl bg-surface-container-low overflow-hidden shrink-0 shadow-sm">
          <img className="w-full h-full object-cover mix-blend-multiply" alt={title} src={imageUrl} />
          <span className="absolute bottom-1 left-1 bg-on-surface/90 text-surface-container-lowest font-label-technical text-[8px] px-1 py-0.5 rounded tracking-tighter uppercase font-semibold">
            {index < 10 ? `0${index}` : index}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-space-xs">
            <div>
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider block font-medium">
                {manufacturer}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5 font-semibold">
                {title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {specs}
              </p>
            </div>
            <button 
              aria-label={`Remove ${title}`} 
              className="w-11 h-11 -mr-2 -mt-2 flex items-center justify-center text-outline hover:text-error transition-colors active:scale-95" 
              onClick={() => onRemove(id)} 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
          <div className="flex items-center justify-between mt-space-sm">
            <div className="inline-flex items-center bg-surface-container-lowest rounded-xl shadow-sm h-9 border border-surface-container-high">
              <button 
                aria-label="Decrease quantity" 
                className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-90" 
                onClick={() => onDecrease(id)} 
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-label-md text-label-md text-on-surface px-2.5 min-w-[28px] text-center select-none font-semibold">
                {quantity}
              </span>
              <button 
                aria-label="Increase quantity" 
                className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-90" 
                onClick={() => onIncrease(id)} 
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
            <div className="text-right">
              <span className="font-label-technical text-[9px] uppercase tracking-widest text-on-surface-variant block">PRICE</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-surface-container-high mt-space-md"></div>
    </article>
  );
}
