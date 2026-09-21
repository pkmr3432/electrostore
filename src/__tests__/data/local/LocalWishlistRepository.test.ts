import { LocalWishlistRepository } from '../../../data/local/LocalWishlistRepository';
import { StorageAdapter } from '../../../core/storage/AsyncStorageAdapter';
import { WishlistItem } from '../../../domain/models';

describe('LocalWishlistRepository', () => {
  let repository: LocalWishlistRepository;
  let mockStorage: jest.Mocked<StorageAdapter>;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    repository = new LocalWishlistRepository(mockStorage);
  });

  it('should retrieve wishlist items from storage', async () => {
    const items: WishlistItem[] = [{ id: '1', productId: 'p1', addedAt: new Date() }];
    mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(items));

    const result = await repository.getWishlistItems();
    
    expect(mockStorage.getItem).toHaveBeenCalledWith('@guest_wishlist');
    expect(result.length).toBe(1);
    expect(result[0].productId).toBe('p1');
  });

  it('should return empty array if no data is found', async () => {
    mockStorage.getItem.mockResolvedValueOnce(null);

    const result = await repository.getWishlistItems();
    
    expect(result).toEqual([]);
  });

  it('should sync wishlist items to storage', async () => {
    const items: WishlistItem[] = [{ id: '1', productId: 'p1', addedAt: new Date() }];
    
    await repository.syncWishlist(items);
    
    expect(mockStorage.setItem).toHaveBeenCalledWith('@guest_wishlist', JSON.stringify(items));
  });

  it('should clear wishlist items from storage', async () => {
    await repository.clearWishlist();
    
    expect(mockStorage.removeItem).toHaveBeenCalledWith('@guest_wishlist');
  });

  it('should handle malformed JSON gracefully', async () => {
    mockStorage.getItem.mockResolvedValueOnce('invalid json');

    const result = await repository.getWishlistItems();
    
    expect(result).toEqual([]); // Fallback to empty array
  });
});
