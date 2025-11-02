/**
 * Authentication service
 * Handles all authentication-related API calls
 */

import { apiClient } from '@/lib/api';

// Types
export type UserRole = 'CHILD' | 'NURSE' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: string; // JWT token string according to your API spec
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

/**
 * Authentication service object containing all auth-related methods
 */
export const authService = {
  /**
   * Login user with email and password
   * @param credentials - User login credentials
   * @returns Promise with auth response containing token and user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Register new user
   * @param credentials - User signup credentials including role
   * @returns Promise with signup response containing user data
   */
  signup: async (credentials: SignupCredentials): Promise<SignupResponse> => {
    return apiClient<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Logout user by clearing local storage
   */
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_token');
    }
  },

  /**
   * Get stored authentication token from localStorage
   * @returns Token string or null if not found
   */
  getStoredToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },

  /**
   * Get stored user token from localStorage
   * @returns User token string or null if not found
   */
  getStoredUserToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('user_token');
  },

  /**
   * Store authentication tokens in localStorage
   * @param token - Auth token
   * @param userToken - User token
   */
  storeTokens: (token: string, userToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_token', userToken);
    }
  },
};
