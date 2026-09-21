import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-on-surface">
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface flex-grow">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
