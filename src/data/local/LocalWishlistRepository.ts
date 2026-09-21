import { WishlistRepository } from '../../domain/repositories';
import { WishlistItem } from '../../domain/models';
import { StorageAdapter } from '../../core/storage/AsyncStorageAdapter';

const WISHLIST_STORAGE_KEY = '@guest_wishlist';

export class LocalWishlistRepository implements WishlistRepository {
  constructor(private storageAdapter: StorageAdapter) {}

  async getWishlistItems(): Promise<WishlistItem[]> {
    try {
      const data = await this.storageAdapter.getItem(WISHLIST_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('LocalWishlistRepository getWishlistItems error', e);
    }
    return [];
  }

  async syncWishlist(items: WishlistItem[]): Promise<void> {
    try {
      await this.storageAdapter.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('LocalWishlistRepository syncWishlist error', e);
    }
  }

  async clearWishlist(): Promise<void> {
    try {
      await this.storageAdapter.removeItem(WISHLIST_STORAGE_KEY);
    } catch (e) {
      console.error('LocalWishlistRepository clearWishlist error', e);
    }
  }
}
