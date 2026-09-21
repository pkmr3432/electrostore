import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ui/ProductCard';
import { CategoryPill } from '../components/ui/CategoryPill';
import { WishlistButton } from '../components/ui/WishlistButton';

export function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Search Section */}
      <section className="px-margin pt-space-xs pb-space-sm bg-surface">
        <div className="relative w-full">
          <label className="sr-only" htmlFor="catalog-search">Search devices, accessories &amp; sound</label>
          <div className="relative flex items-center w-full bg-surface-container-low rounded-xl">
            <span className="material-symbols-outlined text-outline text-[20px] ml-space-md select-none pointer-events-none">search</span>
            <input 
              className="w-full h-12 bg-transparent pl-space-xs pr-space-md font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none" 
              id="catalog-search" 
              placeholder="Search audio, computing &amp; accessories..." 
              type="text" 
            />
            <button aria-label="Filter options" className="mr-space-xs p-space-2xs text-on-surface-variant hover:text-primary-container transition-colors" type="button">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Statement */}
      <section className="px-margin pt-space-md pb-space-lg bg-surface">
        <div className="flex items-center justify-between pb-space-sm">
          <span className="font-label-technical text-label-technical tracking-widest text-secondary uppercase">Autumn Collection</span>
          <span className="font-label-technical text-label-technical tracking-widest text-outline uppercase">2024</span>
        </div>
        <div className="pt-space-xs pb-space-xs">
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface leading-[1.12] tracking-tight">
            Technology,<br />curated for<br /><span className="italic font-normal">modern living.</span>
          </h2>
        </div>
      </section>

      {/* Hero Showcase */}
      <section className="px-margin pb-space-xl">
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm bg-inverse-surface text-inverse-on-surface">
          <div 
            className="bg-cover bg-center w-full h-80 flex flex-col justify-between p-space-lg relative" 
            style={{ backgroundImage: `url('/assets/images/hero.jpg')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center px-space-xs py-space-2xs bg-surface-container-lowest/20 backdrop-blur-md rounded text-inverse-on-surface font-label-technical text-label-technical tracking-widest uppercase">Audio Focus</span>
              <span className="font-label-technical text-label-technical tracking-widest text-inverse-on-surface/80 uppercase">Series 01</span>
            </div>
            <div className="relative z-10 flex flex-col gap-space-sm pt-space-xl">
              <div className="flex flex-col gap-space-2xs">
                <p className="font-label-md text-label-md tracking-wider text-on-primary-container uppercase">Studio Sound</p>
                <h3 className="font-headline-sm text-headline-sm text-inverse-on-surface font-medium max-w-[280px] leading-snug">Precision wireless over-ear transducers engineered with aerospace aluminum.</h3>
              </div>
              <div className="flex items-center justify-between pt-space-xs">
                <Link to="#" className="inline-flex items-center gap-space-2xs font-label-lg text-label-lg text-inverse-on-surface hover:text-on-primary-container transition-colors">
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <div aria-label="Slide indicators" className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-surface-container-lowest rounded-full transition-all"></span>
                  <span className="w-1.5 h-1 bg-inverse-on-surface/40 rounded-full"></span>
                  <span className="w-1.5 h-1 bg-inverse-on-surface/40 rounded-full"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-space-lg">
        <div className="px-margin pb-space-xs">
          <span className="font-label-technical text-label-technical text-outline uppercase tracking-widest">Categories</span>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-margin gap-space-xs items-center text-nowrap pb-space-2xs">
          <CategoryPill label="All" isActive={true} />
          <CategoryPill label="Audio" />
          <CategoryPill label="Computing" />
          <CategoryPill label="Smartphones" />
          <CategoryPill label="Accessories" />
        </div>
      </section>

      {/* Featured Product */}
      <section className="px-margin pb-space-2xl">
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-2xs">
              <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span>
              <span className="font-label-technical text-label-technical tracking-widest text-on-surface font-semibold uppercase">Featured Edition</span>
            </div>
            <span className="font-label-technical text-label-technical text-outline uppercase tracking-wider">Braun</span>
          </div>
          <div className="relative w-full aspect-square bg-surface-container-highest rounded-xl overflow-hidden flex items-center justify-center">
            <img className="w-full h-full object-cover mix-blend-multiply" alt="Atelier Series 1 Wireless Headphone" src="/assets/images/product-atelier.jpg" />
            <div className="absolute top-space-sm right-space-sm z-10">
              <WishlistButton className="w-11 h-11" />
            </div>
            <div className="absolute bottom-space-sm left-space-sm px-space-xs py-space-2xs bg-surface-container-lowest/90 backdrop-blur-sm rounded">
              <span className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface font-medium">Custom Acoustic Drivers</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs pt-space-2xs">
            <h3 className="font-headline-md text-headline-md text-on-surface leading-tight font-medium">Atelier Series 1 Wireless Headphone</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-2xs pt-space-2xs">
              <span>40mm Beryllium Drivers</span>
              <span className="inline-block w-1 h-1 bg-outline-variant rounded-full"></span>
              <span>48hr Battery</span>
              <span className="inline-block w-1 h-1 bg-outline-variant rounded-full"></span>
              <span>ANC</span>
            </p>
            <div className="flex items-center justify-between pt-space-md">
              <div className="flex flex-col">
                <span className="font-label-technical text-label-technical uppercase text-outline tracking-wider">Price</span>
                <span className="font-price-hero text-price-hero text-on-surface">$499.00</span>
              </div>
              <Link to="#" className="inline-flex items-center justify-center px-space-lg h-11 bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider rounded-xl active:scale-[0.985] transition-colors">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Header */}
      <section className="px-margin pb-space-md">
        <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-sm rounded-lg">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-on-surface">auto_awesome</span>
            <h4 className="font-label-technical text-label-technical tracking-widest uppercase text-on-surface font-semibold">New Arrivals</h4>
          </div>
          <span className="font-label-technical text-label-technical text-outline uppercase tracking-wider">4 Items</span>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-margin pb-space-2xl">
        <div className="grid grid-cols-2 gap-space-sm w-full">
          <ProductCard 
            id="1"
            title="Phone (2a) Pro"
            manufacturer="Nothing"
            price="$649.00"
            imageUrl="/assets/images/product-nothing.jpg"
            badge="Limited"
          />
          <ProductCard 
            id="2"
            title="MagCharge Duo"
            manufacturer="Nomad"
            price="$129.00"
            imageUrl="/assets/images/product-magcharge.jpg"
          />
          <ProductCard 
            id="3"
            title="Titanium 75% Board"
            manufacturer="Keychron"
            price="$210.00"
            imageUrl="/assets/images/product-keyboard.jpg"
          />
          <ProductCard 
            id="4"
            title="Spatial Sound Pod"
            manufacturer="Sonos"
            price="$399.00"
            imageUrl="/assets/images/product-sonos.jpg"
            badge="Pre-Order"
          />
        </div>
      </section>

      {/* Curatorial Note */}
      <section className="px-margin pb-space-3xl pt-space-sm">
        <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-outline-variant/30">
          <div className="flex items-center gap-space-2xs text-outline">
            <span className="material-symbols-outlined text-[18px] text-on-surface">verified</span>
            <span className="font-label-technical text-label-technical tracking-widest uppercase font-semibold text-on-surface">Guaranteed Authenticity &amp; 2-Year Warranty</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Every curated device is inspected and backed by official manufacturer warranty.
          </p>
        </div>
      </section>
    </div>
  );
}
