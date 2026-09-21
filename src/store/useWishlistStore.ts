import { create } from 'zustand';
import { WishlistItem } from '../domain/models';

interface WishlistState {
  items: WishlistItem[];
  hydrationStatus: 'idle' | 'hydrating' | 'hydrated';
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  setItems: (items: WishlistItem[]) => void;
  setHydrationStatus: (status: 'idle' | 'hydrating' | 'hydrated') => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  hydrationStatus: 'idle',
  addItem: (item) => set((state) => {
    if (state.items.some(i => i.productId === item.productId)) return state;
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearWishlist: () => set({ items: [] }),
  setItems: (items) => set({ items }),
  setHydrationStatus: (status) => set({ hydrationStatus: status }),
}));
