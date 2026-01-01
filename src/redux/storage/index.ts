import { Storage } from 'redux-persist';
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'redux_storage',
});

export const token_storage = createMMKV({
  id: 'user_storage',
  encryptionKey: '1234567890123456',
});

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
