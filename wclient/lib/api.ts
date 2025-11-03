/**
 * Centralized API client for making HTTP requests to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiError {
  message: string;
  status: number;
}

/**
 * Generic API client function that handles authentication headers and errors
 * @param endpoint - API endpoint (e.g., '/api/auth/login')
 * @param options - Fetch options (method, body, headers, etc.)
 * @returns Promise with parsed JSON response
 */
export async function apiClient<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage (only on client side)
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('auth_token')
    : null;

  // Merge default headers with provided headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse the response body
    const data = await response.json();

    // Handle non-successful responses
    if (!response.ok) {
      const error: ApiError = {
        message: data.message || data.error || 'An error occurred',
        status: response.status,
      };
      throw error;
    }

    return data;
  } catch (error: any) {
    // Re-throw API errors with proper structure
    if (error.status) {
      throw error;
    }

    // Handle network errors or other unexpected errors
    throw {
      message: error.message || 'Network error. Please check your connection.',
      status: 0,
    } as ApiError;
  }
}

export type { ApiError };
