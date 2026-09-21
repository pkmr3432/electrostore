import { Link } from 'react-router-dom';
import { WishlistButton } from './WishlistButton';

export function ProductCard({ 
  id, 
  title, 
  manufacturer, 
  price, 
  imageUrl, 
  badge, 
  href = "#" 
}) {
  return (
    <Link to={href} className="flex flex-col bg-surface-container-low rounded-xl p-space-xs shadow-sm group">
      <div className="relative w-full aspect-square bg-surface-container-highest rounded-lg overflow-hidden flex items-center justify-center">
        <img 
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
          src={imageUrl} 
          alt={title} 
        />
        {badge && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-technical text-[9px] tracking-widest uppercase rounded shadow-sm">
            {badge}
          </span>
        )}
        <div className="absolute top-2 right-2 z-10" onClick={(e) => e.preventDefault()}>
          <WishlistButton className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-col p-space-2xs pt-space-xs">
        <span className="font-label-technical text-label-technical tracking-widest text-outline uppercase">
          {manufacturer}
        </span>
        <h5 className="font-headline-sm text-[14px] leading-snug text-on-surface font-medium truncate pt-space-2xs">
          {title}
        </h5>
        <span className="font-price-hero text-[16px] text-on-surface font-semibold pt-space-xs">
          {price}
        </span>
      </div>
    </Link>
  );
}
