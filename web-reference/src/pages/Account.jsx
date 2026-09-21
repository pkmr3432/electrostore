import { Link } from 'react-router-dom';

export function Account() {
  const handleSignOut = () => {
    const confirmed = window.confirm('Confirm termination of session for Helena Vance?');
    if (confirmed) {
      alert('Session cleared safely.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="px-margin pt-space-md pb-space-sm flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">Overview</span>
          <h1 className="font-headline-md text-headline-md text-on-surface">My Account</h1>
        </div>
        <button aria-label="Settings" className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform active:scale-95">
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-margin mb-space-lg">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-container-highest flex-shrink-0 shadow-sm">
              <img alt="Helena Vance" className="w-full h-full object-cover" src="/assets/images/profile.jpg" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/20 to-transparent"></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-md text-headline-md text-on-surface truncate">Helena Vance</h2>
                <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">helena.vance@atelier-tech.com</p>
              <div className="mt-space-2xs inline-flex items-center gap-1.5 self-start py-0.5 px-2 bg-surface-container-high rounded text-on-surface">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span className="font-label-technical text-[9px] tracking-wider uppercase font-semibold">Verified Member</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-space-xs pt-space-xs border-t border-surface-container">
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">Orders</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-price-hero text-price-hero text-on-surface">12</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Orders</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">Saved</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-price-hero text-price-hero text-on-surface">04</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Saved</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">Devices</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-price-hero text-price-hero text-on-surface">03</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Order */}
      <div className="px-margin mb-space-lg">
        <div className="flex items-center justify-between mb-space-2xs">
          <span className="font-label-technical text-label-technical tracking-wider uppercase text-on-surface-variant">Recent Order</span>
          <Link to="#" className="font-label-technical text-label-technical uppercase tracking-wider text-primary-container font-semibold">View All Orders</Link>
        </div>
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm relative overflow-hidden flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-primary-container">local_shipping</span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">Order #ES-9042</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-label-technical uppercase tracking-wider bg-surface-container-high text-on-surface font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container mr-1"></span>Delivered
            </span>
          </div>
          <div className="flex items-center justify-between py-space-2xs">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Atelier Series 1 Display Unit</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Delivered on Sep 14, 2024</p>
            </div>
            <span className="font-price-hero text-price-hero text-on-surface">$499.00</span>
          </div>
          <div className="bg-surface-container-low px-space-sm py-space-xs rounded flex items-center justify-between mt-space-2xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">qr_code_2</span>
              <span className="font-label-technical text-label-technical uppercase text-on-surface-variant tracking-wider">SKU: AT-904-SLV</span>
            </div>
            <button type="button" className="font-label-technical text-label-technical uppercase text-primary-container tracking-wider font-semibold active:opacity-70">
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Modules */}
      <div className="px-margin mb-space-lg">
        <span className="font-label-technical text-label-technical tracking-wider uppercase text-on-surface-variant px-space-2xs block mb-space-xs">Account Settings</span>
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <Link to="#" className="p-space-md flex items-center justify-between active:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">My Orders</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Purchase history, invoices, and tracking</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs flex-shrink-0 pl-space-xs">
              <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-technical text-[9px] flex items-center justify-center font-bold">12</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
            </div>
          </Link>
          <div className="h-[1px] bg-surface-container mx-space-md"></div>
          
          <Link to="#" className="p-space-md flex items-center justify-between active:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Shipping Addresses</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Manage primary and secondary shipping locations</span>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0 pl-space-xs">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
            </div>
          </Link>
          <div className="h-[1px] bg-surface-container mx-space-md"></div>
          
          <Link to="#" className="p-space-md flex items-center justify-between active:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Payment Methods</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Saved cards and billing information</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs flex-shrink-0 pl-space-xs">
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">Default: •••• 4091</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
            </div>
          </Link>
          <div className="h-[1px] bg-surface-container mx-space-md"></div>
          
          <Link to="#" className="p-space-md flex items-center justify-between active:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">devices</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Registered Devices &amp; Warranties</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Serial numbers, warranty status &amp; coverage</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs flex-shrink-0 pl-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
            </div>
          </Link>
          <div className="h-[1px] bg-surface-container mx-space-md"></div>
          
          <Link to="#" className="p-space-md flex items-center justify-between active:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Notifications &amp; Preferences</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Order updates, releases and marketing</span>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0 pl-space-xs">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Priority Care Banner */}
      <div className="px-margin mb-space-lg">
        <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex flex-col pr-space-sm">
            <span className="font-label-technical text-label-technical uppercase tracking-wider text-primary-container font-semibold">Priority Care</span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">ElectroStore Customer Care</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">24/7 direct assistance with orders, warranties, and device setup.</p>
          </div>
          <button type="button" className="px-3 py-2 bg-on-surface text-surface-container-lowest rounded-lg font-label-technical text-label-technical uppercase tracking-wider whitespace-nowrap active:scale-95 transition-transform font-semibold">
            Contact Support
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-margin mb-space-xl">
        <button 
          onClick={handleSignOut}
          className="w-full bg-surface-container-lowest active:bg-surface-container-low p-space-md rounded-xl shadow-sm flex items-center justify-between transition-colors" 
          type="button"
        >
          <div className="flex items-center gap-space-md">
            <div className="w-9 h-9 rounded-lg bg-error-container/30 flex items-center justify-center text-error flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-sm text-headline-sm text-error">Sign Out</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Sign out of your account</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-error">arrow_forward</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-margin pb-space-lg flex flex-col items-center justify-center text-center gap-1">
        <div className="flex items-center gap-space-2xs text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
          <span className="font-label-technical text-label-technical uppercase tracking-widest">ElectroStore App v2.4.0</span>
        </div>
        <p className="font-body-sm text-[11px] text-on-surface-variant">Terms of Service &amp; Privacy Policy</p>
      </div>
    </div>
  );
}
