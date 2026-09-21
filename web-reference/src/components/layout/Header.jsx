import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-14 px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <Link to="/">
            <img 
              alt="ElectroStore Monogram Wordmark" 
              className="h-8 w-auto object-contain" 
              src="/assets/images/logo.svg" 
            />
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="sr-only">ElectroStore</h1>
          <div className="flex items-center gap-space-2xs">
            <button aria-label="Search" className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <Link to="/cart" aria-label="Cart" className="w-11 h-11 flex items-center justify-center relative text-on-surface hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-primary-container text-on-primary font-label-technical text-[9px] rounded-full">
                2
              </span>
            </Link>
            <div className="w-11 h-11 flex items-center justify-center pl-space-2xs">
              <Link to="/account">
                <img 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover" 
                  src="/assets/images/profile.jpg" 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
