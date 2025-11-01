import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
};

export const storage = {
  // Auth Token
  async setAuthToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeAuthToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // User Data
  async setUserData(userData: any): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  },

  async getUserData(): Promise<any | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async removeUserData(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // User Role
  async setUserRole(role: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  },

  async getUserRole(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);
  },

  async removeUserRole(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  },

  // Clear all storage
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.USER_ROLE,
    ]);
  },
};
