import { useState } from 'react';
import { CartItem } from '../components/ui/CartItem';

export function Cart() {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Atelier Series 1 — Matte Obsidian',
      manufacturer: 'BRAUN × ELECTROSTORE',
      specs: 'Space Gray / 64Ω Spec',
      price: 499.00,
      imageUrl: '/assets/images/product-atelier-obsidian.jpg',
      quantity: 1
    },
    {
      id: '2',
      title: 'MagCharge Precision Stand',
      manufacturer: 'NOMAD LABS',
      specs: 'Anodized Aluminum / Dual',
      price: 129.00,
      imageUrl: '/assets/images/product-magcharge-dock.jpg',
      quantity: 1
    }
  ]);

  const handleIncrease = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Assuming free shipping for now

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-2xs">
        <div className="flex items-baseline justify-between pt-space-xs">
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-medium">Shopping Bag</h2>
          <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider font-medium">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items selected
          </span>
        </div>
        <div className="h-px w-full bg-surface-container-highest mt-space-sm"></div>
      </section>

      {/* Items List */}
      <section className="px-margin flex flex-col gap-space-md">
        {items.map((item, index) => (
          <CartItem 
            key={item.id}
            index={index + 1}
            {...item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        ))}
      </section>

      {/* Logistics Row */}
      <section className="px-margin my-space-xs">
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex items-center justify-between border border-surface-container-high">
          <div className="flex items-center gap-space-xs min-w-0">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-label-lg text-label-lg text-on-surface truncate font-medium">Standard Express Shipping</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Complimentary carbon-neutral delivery</span>
            </div>
          </div>
          <span className="font-label-technical text-label-technical uppercase tracking-wider text-primary bg-primary-fixed px-2 py-1 rounded shrink-0 font-semibold">Free</span>
        </div>
      </section>

      {/* Order Summary */}
      <section className="px-margin mt-space-md flex flex-col gap-space-md">
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
          <div className="flex justify-between items-center pb-space-2xs">
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-on-surface-variant">ORDER SUMMARY</span>
            <span className="font-label-technical text-label-technical tracking-wider text-secondary">USD CURRENCY</span>
          </div>
          <div className="h-px w-full bg-surface-container-highest my-space-2xs"></div>
          <div className="flex justify-between items-center text-on-surface">
            <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
            <span className="font-body-md text-body-md font-semibold text-on-surface">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body-md text-body-md text-on-surface-variant">Shipping</span>
            <div className="flex items-center gap-1.5">
              <span className="font-body-sm text-body-sm line-through text-outline">$45.00</span>
              <span className="font-body-md text-body-md font-semibold text-primary">FREE</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body-md text-body-md text-on-surface-variant">Protective Packaging</span>
            <span className="font-body-md text-body-md font-medium text-on-surface">Complimentary</span>
          </div>
          <div className="h-px w-full bg-surface-container-highest my-space-2xs"></div>
          <div className="flex justify-between items-baseline pt-space-2xs">
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant font-semibold">ESTIMATED TOTAL</span>
              <span className="font-body-sm text-body-sm text-secondary">Includes VAT &amp; Local Levies</span>
            </div>
            <span className="font-price-hero text-price-hero text-on-surface font-semibold tracking-tight">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 py-space-2xs text-secondary text-center px-space-xs">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">lock</span>
          <span className="font-label-technical text-label-technical tracking-wider uppercase text-on-surface-variant">Secure 256-bit checkout • 30-day return policy</span>
        </div>
        
        <div className="pt-space-2xs pb-space-lg">
          <button className="w-full h-[52px] bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between px-space-md shadow-md active:scale-[0.985] transition-all hover:bg-primary duration-150" type="button">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
              <span className="font-semibold">Proceed to Checkout</span>
            </span>
            <span className="font-semibold tracking-tight text-surface-container-lowest text-[16px]">
              ${total.toFixed(2)}
            </span>
          </button>
          <div className="mt-space-xs flex justify-between items-center px-1 text-on-surface-variant font-label-technical text-[10px]">
            <span>SHIPS VIA DHL EXPRESS IN 24H</span>
            <span>FREE 30-DAY RETURNS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
