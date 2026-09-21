import { WishlistCard } from '../components/ui/WishlistCard';

export function Wishlist() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="px-margin pt-space-lg pb-space-md flex flex-col gap-space-2xs">
        <div className="flex items-baseline justify-between">
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight">Saved Items</h2>
          <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">4 items saved</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">Review your saved hardware selections and manage availability.</p>
      </div>

      {/* Subtotal & Actions */}
      <div className="px-margin mb-space-md flex flex-col gap-space-sm">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="font-label-technical text-label-technical uppercase text-on-surface-variant tracking-wider">Subtotal Value</span>
            <span className="font-price-hero text-[18px] text-on-surface">$2,527.00</span>
          </div>
          <button type="button" className="h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider flex items-center gap-space-2xs active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Move All to Cart</span>
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-2xs">
            <button className="px-space-sm h-8 rounded-full bg-on-surface text-surface font-label-technical text-label-technical uppercase tracking-wider flex items-center shadow-sm">All (4)</button>
            <button className="px-space-sm h-8 rounded-full bg-surface-container-high text-on-surface-variant font-label-technical text-label-technical uppercase tracking-wider flex items-center hover:text-on-surface transition-colors">In Stock (3)</button>
          </div>
          <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">Sort: Saved Order</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-margin mb-space-xl">
        <div className="grid grid-cols-2 gap-gutter-sm">
          <WishlistCard 
            id="1"
            title="Atelier Series 1 Wireless Headphone"
            manufacturer="BRAUN"
            price="$499.00"
            imageUrl="/assets/images/product-atelier.jpg"
            badge="In Stock"
          />
          <WishlistCard 
            id="2"
            title="Studio Monitor 8K Monolith"
            manufacturer="STUDIO DISPLAY"
            price="$1,599.00"
            imageUrl="/assets/images/product-monitor.jpg"
            badge="In Stock"
          />
          <WishlistCard 
            id="3"
            title="Precision CNC Mini Chassis"
            manufacturer="BAUHAUS TECH"
            price="$180.00"
            imageUrl="/assets/images/product-case.jpg"
            badge="Out of Stock"
            badgeType="out-of-stock"
            statusNote="Expected next week"
            actionText="Notify Me"
            actionIcon="notifications"
          />
          <WishlistCard 
            id="4"
            title="Linear Field Microphone"
            manufacturer="TEENAGE TECH"
            price="$249.00"
            imageUrl="/assets/images/product-mic.jpg"
            badge="In Stock"
          />
        </div>
      </div>

      {/* Tracking Note */}
      <div className="px-margin mb-space-3xl">
        <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container-high flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-[22px] text-primary-container flex-shrink-0">verified</span>
          <div className="flex flex-col gap-space-2xs">
            <span className="font-label-technical text-label-technical uppercase font-semibold text-on-surface tracking-wider">Price Tracking &amp; Stock Alerts</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">We will notify you if prices drop or out-of-stock items become available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
