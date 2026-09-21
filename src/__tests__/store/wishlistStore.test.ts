import { useWishlistStore } from '../../store/useWishlistStore';

describe('useWishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it('should add an item to the wishlist', () => {
    useWishlistStore.getState().addItem({
      id: 'wish-1',
      productId: 'prod-1',
      addedAt: new Date()
    });

    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(useWishlistStore.getState().items[0].productId).toBe('prod-1');
  });

  it('should not add a duplicate item to the wishlist', () => {
    useWishlistStore.getState().addItem({
      id: 'wish-1',
      productId: 'prod-1',
      addedAt: new Date()
    });

    useWishlistStore.getState().addItem({
      id: 'wish-2',
      productId: 'prod-1',
      addedAt: new Date()
    });

    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('should remove an item from the wishlist', () => {
    useWishlistStore.getState().addItem({
      id: 'wish-1',
      productId: 'prod-1',
      addedAt: new Date()
    });

    useWishlistStore.getState().removeItem('wish-1');
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
