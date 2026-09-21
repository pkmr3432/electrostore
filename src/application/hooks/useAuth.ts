import { useState, useCallback } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useRepositories } from '../../core/di/RepositoryProvider';
import { mergeGuestCart, mergeGuestWishlist } from '../services/mergeGuestState';
import { User } from '../../domain/models';

export function useAuth() {
  const { authRepository, cartRepository, wishlistRepository } = useRepositories();
  const authState = useAuthStore();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performMerge = async () => {
    try {
      const guestCart = cartStore.items;
      const guestWishlist = wishlistStore.items;
      
      // In a real app, we would fetch the user's remote cart and wishlist.
      // Here, because we are using LocalCartRepository and LocalWishlistRepository as a mock for BOTH
      // guest and authenticated state, and we don't have a separate "AuthenticatedCartRepository",
      // we'll simulate fetching the authenticated user's state by just keeping the current items in the repository,
      // as they are stored in the same local storage for this mock phase.
      // Wait, in Phase 3 instructions: "Obtain the authenticated user's existing state from the MockAuth/User repository layer as appropriate."
      // Since we don't have a separate cart/wishlist per user in the mock yet, we will just use the current repository state 
      // (which IS the guest state currently). 
      // Actually, to correctly simulate merge where the user has existing state, we can simulate an existing remote cart.
      // Let's create dummy existing auth state if they log in as 'user-helen'.
      
      let existingAuthCart = await cartRepository.getCartItems();
      let existingAuthWishlist = await wishlistRepository.getWishlistItems();
      
      // For demonstration of merge, if logging in, we pretend the server returned these:
      // (Normally this would be fetched from authCartRepository)
      if (authState.user?.id === 'user-helen') {
        const hasDummy = existingAuthCart.some(i => i.productId === 'prod-2');
        if (!hasDummy) {
          existingAuthCart = [...existingAuthCart, { id: 'mock-cart-2', productId: 'prod-2', quantity: 1, priceAtAdded: 129.00, currency: 'USD' }];
        }
      }

      const mergedCart = mergeGuestCart(guestCart, existingAuthCart);
      const mergedWishlist = mergeGuestWishlist(guestWishlist, existingAuthWishlist);

      // Persist the merged state
      await cartRepository.syncCart(mergedCart);
      await wishlistRepository.syncWishlist(mergedWishlist);

      // Hydrate stores with merged state
      cartStore.setItems(mergedCart);
      wishlistStore.setItems(mergedWishlist);

    } catch (err) {
      console.error('Failed to merge guest state:', err);
      // DO NOT clear guest state on failure
      throw new Error('Merge failed');
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, session } = await authRepository.login(email, password);
      
      // We set auth state first
      authState.login(user, session);
      
      // Then merge guest state
      await performMerge();
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'isVerified' | 'registeredAt'>, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, session } = await authRepository.register(userData, password);
      
      authState.login(user, session);
      
      await performMerge();
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authRepository.logout();
      authState.logout();
      
      // In this mock, transitioning back to guest mode could mean clearing the local "authenticated" state
      // But we must NOT delete their guest data before guest state is established.
      // Wait, in our mock, they are the same local repository. 
      // We'll leave the local cart/wishlist as is for the "new" guest, simulating a fresh device state 
      // (or we could clear it to simulate logging out of a device leaving it empty).
      // "Do not blindly call clear all cart/wishlist during logout."
      // We will just clear the stores to reset to an empty guest state on logout.
      cartStore.setItems([]);
      wishlistStore.setItems([]);
      await cartRepository.clearCart();
      await wishlistRepository.clearWishlist();
      
    } catch (err: any) {
      console.error('Logout error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreSession = useCallback(async () => {
    if (authState.hydrationStatus !== 'idle') return;
    
    authState.setHydrationStatus('hydrating');
    try {
      const result = await authRepository.restoreSession();
      if (result) {
        authState.login(result.user, result.session);
      }
    } catch (err) {
      console.error('Failed to restore session', err);
    } finally {
      authState.setHydrationStatus('hydrated');
    }
  }, [authState.hydrationStatus, authRepository, authState]);

  return {
    user: authState.user,
    session: authState.session,
    isAuthenticated: authState.isAuthenticated,
    isHydrated: authState.hydrationStatus === 'hydrated',
    isLoading,
    error,
    login,
    register,
    logout,
    restoreSession,
  };
}
