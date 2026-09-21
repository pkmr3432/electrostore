import * as SecureStore from 'expo-secure-store';
import { StorageAdapter } from './AsyncStorageAdapter';

export const SecureStoreAdapter: StorageAdapter = {
  async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('SecureStore getItem error', e);
      return null;
    }
  },
  async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('SecureStore setItem error', e);
    }
  },
  async removeItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('SecureStore removeItem error', e);
    }
  },
  async clear() {
    // SecureStore does not have a generic clear() method.
    // In practice, we manually remove specific keys.
    // For this interface parity, we might throw or do nothing, 
    // but typically we'd maintain a list of known keys to clear.
    console.warn('SecureStoreAdapter.clear() called but not fully implemented.');
  }
};
