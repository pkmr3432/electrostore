import { CartRepository } from '../../domain/repositories';
import { CartItem } from '../../domain/models';
import { StorageAdapter } from '../../core/storage/AsyncStorageAdapter';

const CART_STORAGE_KEY = '@guest_cart';

export class LocalCartRepository implements CartRepository {
  constructor(private storageAdapter: StorageAdapter) {}

  async getCartItems(): Promise<CartItem[]> {
    try {
      const data = await this.storageAdapter.getItem(CART_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('LocalCartRepository getCartItems error', e);
    }
    return [];
  }

  async syncCart(items: CartItem[]): Promise<void> {
    try {
      await this.storageAdapter.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('LocalCartRepository syncCart error', e);
    }
  }

  async clearCart(): Promise<void> {
    try {
      await this.storageAdapter.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error('LocalCartRepository clearCart error', e);
    }
  }
}
