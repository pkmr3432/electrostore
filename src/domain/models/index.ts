export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  registeredAt: Date;
}

export interface AuthSession {
  token: string;
  expiresAt: Date;
  userId: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  manufacturer: string;
  description: string;
  price: number;
  currency: string;
  images: any[]; // Using any[] for React Native require() compatibility in Mock
  categoryId: string;
  specifications: Record<string, string>;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER';
  stockQuantity: number;
  badges: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtAdded: number;
  currency: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId?: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddressId: string;
  paymentMethodId: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface ShippingMethod {
  id: string;
  label: string;
  price: number;
  estimatedDelivery: string;
}
