import { Product, Category } from '../models';

export interface ProductFilters {
  categoryId?: string;
  inStockOnly?: boolean;
}

export type ProductSort = 'DEFAULT' | 'PRICE_ASC' | 'PRICE_DESC';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getFeatured(): Promise<Product | null>;
  getNewArrivals(): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  searchProducts(query: string, filters?: ProductFilters, sort?: ProductSort): Promise<Product[]>;
}

import { User, AuthSession } from '../models';

export interface AuthRepository {
  login(email: string, password: string): Promise<{ user: User; session: AuthSession }>;
  register(user: Omit<User, 'id' | 'isVerified' | 'registeredAt'>, password: string): Promise<{ user: User; session: AuthSession }>;
  logout(): Promise<void>;
  getCurrentSession(): Promise<{ user: User; session: AuthSession } | null>;
  restoreSession(): Promise<{ user: User; session: AuthSession } | null>;
}

export interface PaymentProvider {
  initializePayment(amount: number, currency: string): Promise<{ paymentIntentId: string; clientSecret: string }>;
  confirmPayment(paymentIntentId: string): Promise<boolean>;
}

import { CartItem, WishlistItem } from '../models';

export interface CartRepository {
  getCartItems(): Promise<CartItem[]>;
  syncCart(items: CartItem[]): Promise<void>;
  clearCart(): Promise<void>;
}

export interface WishlistRepository {
  getWishlistItems(): Promise<WishlistItem[]>;
  syncWishlist(items: WishlistItem[]): Promise<void>;
  clearWishlist(): Promise<void>;
}
