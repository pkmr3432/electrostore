import { NavLink } from 'react-router-dom';

export function BottomNav() {
  const getNavClass = ({ isActive }) => 
    `flex flex-col items-center justify-center gap-space-2xs min-w-[60px] h-11 transition-colors ${
      isActive ? 'text-primary-container' : 'text-secondary'
    }`;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-14 px-margin">
        <NavLink to="/" end className={getNavClass}>
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="font-label-technical text-label-technical uppercase">Home</span>
        </NavLink>
        <NavLink to="/wishlist" className={getNavClass}>
          <span className="material-symbols-outlined text-[24px]">favorite</span>
          <span className="font-label-technical text-label-technical uppercase">Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className={getNavClass}>
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="absolute -top-1 -right-2 flex items-center justify-center w-3.5 h-3.5 bg-primary-container text-on-primary font-label-technical text-[8px] rounded-full">
              2
            </span>
          </div>
          <span className="font-label-technical text-label-technical uppercase">Cart</span>
        </NavLink>
        <NavLink to="/account" className={getNavClass}>
          <span className="material-symbols-outlined text-[24px]">person</span>
          <span className="font-label-technical text-label-technical uppercase">Account</span>
        </NavLink>
      </div>
    </nav>
  );
}
