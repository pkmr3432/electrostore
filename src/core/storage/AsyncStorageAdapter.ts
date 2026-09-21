import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export const AsyncStorageAdapter: StorageAdapter = {
  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('AsyncStorage getItem error', e);
      return null;
    }
  },
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('AsyncStorage setItem error', e);
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('AsyncStorage removeItem error', e);
    }
  },
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('AsyncStorage clear error', e);
    }
  }
};
