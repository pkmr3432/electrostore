import { useCallback, useMemo } from 'react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useRepositories } from '../../core/di/RepositoryProvider';
import { WishlistItem, Product } from '../../domain/models';
import { useProducts } from './useProducts';
import { useCart } from './useCart';

export interface EnrichedWishlistItem extends WishlistItem {
  product?: Product;
}

export function useWishlist() {
  const { wishlistRepository } = useRepositories();
  const { data: products } = useProducts();
  const { addItem: addCartItem } = useCart();
  const store = useWishlistStore();

  const hydrate = useCallback(async () => {
    if (store.hydrationStatus !== 'idle') return;
    
    store.setHydrationStatus('hydrating');
    const items = await wishlistRepository.getWishlistItems();
    store.setItems(items);
    store.setHydrationStatus('hydrated');
  }, [store.hydrationStatus, store.setHydrationStatus, store.setItems, wishlistRepository]);

  const sync = useCallback(async (items: WishlistItem[]) => {
    await wishlistRepository.syncWishlist(items);
  }, [wishlistRepository]);

  const toggleItem = useCallback(async (productId: string) => {
    const existing = useWishlistStore.getState().items.find(i => i.productId === productId);
    
    if (existing) {
      store.removeItem(existing.id);
    } else {
      const newItem: WishlistItem = {
        id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        productId,
        addedAt: new Date()
      };
      store.addItem(newItem);
    }
    
    await sync(useWishlistStore.getState().items);
  }, [store.addItem, store.removeItem, sync]);

  const removeItem = useCallback(async (id: string) => {
    store.removeItem(id);
    await sync(useWishlistStore.getState().items);
  }, [store.removeItem, sync]);

  const enrichedItems = useMemo<EnrichedWishlistItem[]>(() => {
    if (!products) return store.items;
    return store.items.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
  }, [store.items, products]);

  const moveToCart = useCallback(async (id: string) => {
    const item = enrichedItems.find(i => i.id === id);
    if (!item || !item.product) return;
    if (item.product.stockStatus === 'OUT_OF_STOCK') return;

    await addCartItem(item.productId, item.product.price, item.product.currency);
    await removeItem(id);
  }, [enrichedItems, addCartItem, removeItem]);

  const moveAllToCart = useCallback(async () => {
    const inStockItems = enrichedItems.filter(item => 
      item.product && item.product.stockStatus !== 'OUT_OF_STOCK'
    );
    
    for (const item of inStockItems) {
      if (item.product) {
        await addCartItem(item.productId, item.product.price, item.product.currency);
        store.removeItem(item.id);
      }
    }
    
    await sync(useWishlistStore.getState().items);
  }, [enrichedItems, addCartItem, store.removeItem, sync]);

  const subtotal = useMemo(() => {
    return enrichedItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0);
    }, 0);
  }, [enrichedItems]);

  return {
    items: enrichedItems,
    hydrationStatus: store.hydrationStatus,
    subtotal,
    hydrate,
    toggleItem,
    removeItem,
    moveToCart,
    moveAllToCart
  };
}
