import { useCallback, useMemo } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { useRepositories } from '../../core/di/RepositoryProvider';
import { CartItem, Product } from '../../domain/models';
import { useProducts } from './useProducts';

export interface EnrichedCartItem extends CartItem {
  product?: Product;
}

export function useCart() {
  const { cartRepository } = useRepositories();
  const { data: products } = useProducts();
  const store = useCartStore();

  const hydrate = useCallback(async () => {
    if (store.hydrationStatus !== 'idle') return;
    
    store.setHydrationStatus('hydrating');
    const items = await cartRepository.getCartItems();
    store.setItems(items);
    store.setHydrationStatus('hydrated');
  }, [store.hydrationStatus, store.setHydrationStatus, store.setItems, cartRepository]);

  const sync = useCallback(async (items: CartItem[]) => {
    await cartRepository.syncCart(items);
  }, [cartRepository]);

  const addItem = useCallback(async (productId: string, priceAtAdded: number, currency: string) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId,
      quantity: 1,
      priceAtAdded,
      currency
    };
    
    store.addItem(newItem);
    await sync(useCartStore.getState().items);
  }, [store.addItem, sync]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity < 1) {
      store.removeItem(id);
    } else {
      store.updateQuantity(id, quantity);
    }
    await sync(useCartStore.getState().items);
  }, [store.updateQuantity, store.removeItem, sync]);

  const removeItem = useCallback(async (id: string) => {
    store.removeItem(id);
    await sync(useCartStore.getState().items);
  }, [store.removeItem, sync]);

  const clear = useCallback(async () => {
    store.clearCart();
    await cartRepository.clearCart();
  }, [store.clearCart, cartRepository]);

  const enrichedItems = useMemo<EnrichedCartItem[]>(() => {
    if (!products) return store.items;
    return store.items.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
  }, [store.items, products]);

  const subtotal = useMemo(() => {
    return enrichedItems.reduce((sum, item) => {
      const price = item.product?.price || item.priceAtAdded;
      return sum + (price * item.quantity);
    }, 0);
  }, [enrichedItems]);

  const totalItems = useMemo(() => {
    return store.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [store.items]);

  return {
    items: enrichedItems,
    rawItems: store.items,
    hydrationStatus: store.hydrationStatus,
    subtotal,
    totalItems,
    hydrate,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };
}
