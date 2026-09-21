import { mergeGuestCart, mergeGuestWishlist } from '../../application/services/mergeGuestState';
import { CartItem, WishlistItem } from '../../domain/models';

describe('mergeGuestState', () => {
  describe('mergeGuestCart', () => {
    it('should add unique guest items to auth cart', () => {
      const guestCart: CartItem[] = [{ id: '1', productId: 'p1', quantity: 1, priceAtAdded: 10, currency: 'USD' }];
      const authCart: CartItem[] = [{ id: '2', productId: 'p2', quantity: 2, priceAtAdded: 20, currency: 'USD' }];
      
      const merged = mergeGuestCart(guestCart, authCart);
      expect(merged).toHaveLength(2);
    });

    it('should take the maximum quantity for duplicate products', () => {
      const guestCart: CartItem[] = [{ id: '1', productId: 'p1', quantity: 3, priceAtAdded: 10, currency: 'USD' }];
      const authCart: CartItem[] = [{ id: '2', productId: 'p1', quantity: 2, priceAtAdded: 10, currency: 'USD' }];
      
      const merged = mergeGuestCart(guestCart, authCart);
      expect(merged).toHaveLength(1);
      expect(merged[0].quantity).toBe(3);
    });
  });

  describe('mergeGuestWishlist', () => {
    it('should perform a union of unique products', () => {
      const guestWishlist: WishlistItem[] = [{ id: '1', productId: 'p1', addedAt: new Date() }];
      const authWishlist: WishlistItem[] = [
        { id: '2', productId: 'p1', addedAt: new Date() },
        { id: '3', productId: 'p2', addedAt: new Date() }
      ];
      
      const merged = mergeGuestWishlist(guestWishlist, authWishlist);
      expect(merged).toHaveLength(2);
      expect(merged.map(i => i.productId)).toContain('p1');
      expect(merged.map(i => i.productId)).toContain('p2');
    });
  });
});
