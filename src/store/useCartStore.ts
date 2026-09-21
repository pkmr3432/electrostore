import { create } from 'zustand';
import { CartItem } from '../domain/models';

interface CartState {
  items: CartItem[];
  hydrationStatus: 'idle' | 'hydrating' | 'hydrated';
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setHydrationStatus: (status: 'idle' | 'hydrating' | 'hydrated') => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  hydrationStatus: 'idle',
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.productId === item.productId);
    if (existing) {
      return {
        items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i)
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((i) => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
  })),
  clearCart: () => set({ items: [] }),
  setItems: (items) => set({ items }),
  setHydrationStatus: (status) => set({ hydrationStatus: status }),
}));
