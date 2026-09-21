import { CartItem } from '../../domain/models';

// This mock simulates a remote cart repository.
let mockRemoteCart: CartItem[] = [];

export interface CartRepository {
  getCartItems(): Promise<CartItem[]>;
  syncCart(items: CartItem[]): Promise<void>;
  clearCart(): Promise<void>;
}

export class MockCartRepository implements CartRepository {
  async getCartItems(): Promise<CartItem[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockRemoteCart]), 300));
  }

  async syncCart(items: CartItem[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockRemoteCart = [...items];
        resolve();
      }, 300);
    });
  }

  async clearCart(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockRemoteCart = [];
        resolve();
      }, 300);
    });
  }
}
