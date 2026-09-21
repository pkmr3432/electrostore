import React, { createContext, useContext, ReactNode } from 'react';
import { ProductRepository, PaymentProvider, CartRepository, WishlistRepository, AuthRepository } from '../../domain/repositories';
import { MockProductRepository } from '../../data/mock/MockProductRepository';
import { MockPaymentProvider } from '../../data/mock/MockPaymentProvider';
import { LocalCartRepository } from '../../data/local/LocalCartRepository';
import { LocalWishlistRepository } from '../../data/local/LocalWishlistRepository';
import { LocalAuthRepository } from '../../data/local/LocalAuthRepository';
import { AsyncStorageAdapter } from '../storage/AsyncStorageAdapter';

export interface Repositories {
  productRepository: ProductRepository;
  paymentProvider: PaymentProvider;
  cartRepository: CartRepository;
  wishlistRepository: WishlistRepository;
  authRepository: AuthRepository;
}

// For Phase 0 / Local-First, we instantiate the local/mock repositories.
const defaultRepositories: Repositories = {
  productRepository: new MockProductRepository(),
  paymentProvider: new MockPaymentProvider(),
  cartRepository: new LocalCartRepository(AsyncStorageAdapter),
  wishlistRepository: new LocalWishlistRepository(AsyncStorageAdapter),
  authRepository: new LocalAuthRepository(AsyncStorageAdapter),
};

const RepositoryContext = createContext<Repositories>(defaultRepositories);

export function RepositoryProvider({ children, repositories = defaultRepositories }: { children: ReactNode, repositories?: Repositories }) {
  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepositories() {
  return useContext(RepositoryContext);
}
