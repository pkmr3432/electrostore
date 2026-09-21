import { useCartStore } from '../../store/useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should add an item to the cart', () => {
    useCartStore.getState().addItem({
      id: 'item-1',
      productId: 'prod-1',
      quantity: 1,
      priceAtAdded: 100,
      currency: 'USD'
    });

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].productId).toBe('prod-1');
  });

  it('should remove an item from the cart', () => {
    useCartStore.getState().addItem({
      id: 'item-1',
      productId: 'prod-1',
      quantity: 1,
      priceAtAdded: 100,
      currency: 'USD'
    });

    useCartStore.getState().removeItem('item-1');
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('should update the quantity of an item', () => {
    useCartStore.getState().addItem({
      id: 'item-1',
      productId: 'prod-1',
      quantity: 1,
      priceAtAdded: 100,
      currency: 'USD'
    });

    useCartStore.getState().updateQuantity('item-1', 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('should increase quantity when adding a duplicate product', () => {
    useCartStore.getState().addItem({
      id: 'item-1',
      productId: 'prod-1',
      quantity: 1,
      priceAtAdded: 100,
      currency: 'USD'
    });

    useCartStore.getState().addItem({
      id: 'item-2',
      productId: 'prod-1',
      quantity: 2,
      priceAtAdded: 100,
      currency: 'USD'
    });

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });
});
