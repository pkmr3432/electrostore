import { WishlistButton } from './WishlistButton';

export function WishlistCard({ 
  id, 
  title, 
  manufacturer, 
  price, 
  imageUrl, 
  badge,
  badgeType = 'in-stock', // 'in-stock', 'out-of-stock'
  statusNote, // e.g. "Expected next week"
  actionText = "Move to Cart",
  actionIcon = "shopping_bag",
  onActionClick
}) {
  const isOutOfStock = badgeType === 'out-of-stock';

  return (
    <div className={`flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-sm transition-all relative group ${isOutOfStock ? 'opacity-90' : ''}`}>
      <div className="relative w-full aspect-square bg-surface-container flex items-center justify-center overflow-hidden">
        <img 
          className={`w-full h-full object-contain p-space-xs ${isOutOfStock ? 'grayscale contrast-75' : ''}`} 
          alt={title} 
          src={imageUrl} 
        />
        {badge && (
          <div className={`absolute top-space-xs left-space-xs px-space-2xs py-0.5 rounded-lg shadow-sm ${isOutOfStock ? 'bg-surface-container-high' : 'bg-surface-container-lowest/90 backdrop-blur-sm'}`}>
            <span className={`font-label-technical text-label-technical uppercase font-semibold tracking-wider ${isOutOfStock ? 'text-on-surface-variant' : 'text-on-surface'}`}>
              {badge}
            </span>
          </div>
        )}
        <div className="absolute bottom-space-xs right-space-xs">
          <WishlistButton 
            initialChecked={true} 
            className="w-10 h-10 shadow-md bg-surface-container-lowest" 
          />
        </div>
      </div>
      
      <div className="p-space-sm flex flex-col flex-1 justify-between gap-space-xs">
        <div className="flex flex-col">
          <span className="font-label-technical text-label-technical uppercase text-on-surface-variant tracking-wider truncate">
            {manufacturer}
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-2xs line-clamp-2 leading-snug">
            {title}
          </h3>
          <div className="mt-space-xs flex items-baseline gap-space-2xs">
            <span className={`font-price-hero text-price-hero ${isOutOfStock ? 'text-on-surface-variant' : 'text-on-surface'}`}>
              {price}
            </span>
          </div>
          {statusNote && (
            <div className="mt-space-2xs flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span className="font-label-technical text-label-technical uppercase tracking-wider">{statusNote}</span>
            </div>
          )}
        </div>
        
        <div className="pt-space-xs">
          <button 
            type="button"
            onClick={onActionClick}
            className={`w-full h-10 font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-2xs active:scale-[0.98] transition-all shadow-sm ${isOutOfStock ? 'bg-surface-container-high text-on-surface' : 'bg-on-surface text-surface'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{actionIcon}</span>
            <span>{actionText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
