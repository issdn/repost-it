import * as SecureStore from 'expo-secure-store';
import { AvailibleProvider } from 'shared';

const providerToKey = (provider: AvailibleProvider) => {
  return `${provider}_id`;
};

export default {
  save: async (key: AvailibleProvider, value: string) => {
    await SecureStore.setItemAsync(providerToKey(key), value);
  },
  remove: async (key: AvailibleProvider) => {
    await SecureStore.deleteItemAsync(providerToKey(key));
  },
  read: async (key: AvailibleProvider) => {
    return await SecureStore.getItemAsync(providerToKey(key));
  },
  isLinkedTo: async (key: AvailibleProvider) => {
    return (await SecureStore.getItemAsync(providerToKey(key))) !== null;
  },
};
