import { LocalCartRepository } from '../../../data/local/LocalCartRepository';
import { StorageAdapter } from '../../../core/storage/AsyncStorageAdapter';
import { CartItem } from '../../../domain/models';

describe('LocalCartRepository', () => {
  let repository: LocalCartRepository;
  let mockStorage: jest.Mocked<StorageAdapter>;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    repository = new LocalCartRepository(mockStorage);
  });

  it('should retrieve cart items from storage', async () => {
    const items: CartItem[] = [{ id: '1', productId: 'p1', quantity: 2, priceAtAdded: 10, currency: 'USD' }];
    mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(items));

    const result = await repository.getCartItems();
    
    expect(mockStorage.getItem).toHaveBeenCalledWith('@guest_cart');
    expect(result).toEqual(items);
  });

  it('should return empty array if no data is found', async () => {
    mockStorage.getItem.mockResolvedValueOnce(null);

    const result = await repository.getCartItems();
    
    expect(result).toEqual([]);
  });

  it('should sync cart items to storage', async () => {
    const items: CartItem[] = [{ id: '1', productId: 'p1', quantity: 2, priceAtAdded: 10, currency: 'USD' }];
    
    await repository.syncCart(items);
    
    expect(mockStorage.setItem).toHaveBeenCalledWith('@guest_cart', JSON.stringify(items));
  });

  it('should clear cart items from storage', async () => {
    await repository.clearCart();
    
    expect(mockStorage.removeItem).toHaveBeenCalledWith('@guest_cart');
  });

  it('should handle malformed JSON gracefully', async () => {
    mockStorage.getItem.mockResolvedValueOnce('invalid json');

    const result = await repository.getCartItems();
    
    expect(result).toEqual([]); // Fallback to empty array
  });
});
