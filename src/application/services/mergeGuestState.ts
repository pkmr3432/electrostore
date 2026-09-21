import { CartItem, WishlistItem } from '../../domain/models';

export function mergeGuestCart(guestCart: CartItem[], authCart: CartItem[]): CartItem[] {
  const mergedMap = new Map<string, CartItem>();

  // Add auth items first
  authCart.forEach(item => mergedMap.set(item.productId, item));

  // Merge guest items
  guestCart.forEach(guestItem => {
    const existing = mergedMap.get(guestItem.productId);
    if (existing) {
      // Rule: Cart duplicate product -> maximum quantity
      mergedMap.set(guestItem.productId, {
        ...existing,
        quantity: Math.max(existing.quantity, guestItem.quantity),
      });
    } else {
      // Rule: Unique guest products -> added
      mergedMap.set(guestItem.productId, guestItem);
    }
  });

  return Array.from(mergedMap.values());
}

export function mergeGuestWishlist(guestWishlist: WishlistItem[], authWishlist: WishlistItem[]): WishlistItem[] {
  const mergedMap = new Map<string, WishlistItem>();

  authWishlist.forEach(item => mergedMap.set(item.productId, item));

  guestWishlist.forEach(item => {
    if (!mergedMap.has(item.productId)) {
      mergedMap.set(item.productId, item);
    }
  });

  return Array.from(mergedMap.values());
}
