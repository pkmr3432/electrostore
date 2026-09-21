import { AsyncStorageAdapter } from '../../core/storage/AsyncStorageAdapter';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('AsyncStorageAdapter', () => {
  it('should call setItem on AsyncStorage', async () => {
    await AsyncStorageAdapter.setItem('key', 'value');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  it('should call getItem on AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('value');
    const val = await AsyncStorageAdapter.getItem('key');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('key');
    expect(val).toBe('value');
  });
});
