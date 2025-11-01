import { API_ENDPOINTS } from '../config/api';
import { storage } from '../utils/storage';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private async getHeaders(): Promise<HeadersInit> {
    const token = await storage.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async post<T>(url: string, body: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async put<T>(url: string, body: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Specific API methods

  // Parents API
  async getParents() {
    return this.get(API_ENDPOINTS.PARENTS.BASE);
  }

  async getParentById(id: string) {
    return this.get(API_ENDPOINTS.PARENTS.BY_ID(id));
  }

  async createParent(parentData: any) {
    return this.post(API_ENDPOINTS.PARENTS.BASE, parentData);
  }

  async updateParent(id: string, parentData: any) {
    return this.put(API_ENDPOINTS.PARENTS.BY_ID(id), parentData);
  }

  async deleteParent(id: string) {
    return this.delete(API_ENDPOINTS.PARENTS.BY_ID(id));
  }

  // Visits API
  async createVisit(visitData: any) {
    return this.post(API_ENDPOINTS.VISITS.BASE, visitData);
  }

  async getChildVisits() {
    return this.get(API_ENDPOINTS.VISITS.CHILD);
  }

  async getNurseVisits() {
    return this.get(API_ENDPOINTS.VISITS.NURSE);
  }

  async assignNurse(visitId: string, nurseId: string) {
    return this.post(API_ENDPOINTS.VISITS.ASSIGN(visitId), { nurseId });
  }

  async startVisit(visitId: string) {
    return this.post(API_ENDPOINTS.VISITS.START(visitId), {});
  }

  async submitVitals(visitId: string, vitalsData: any) {
    return this.post(API_ENDPOINTS.VISITS.VITALS(visitId), vitalsData);
  }

  async completeVisit(visitId: string) {
    return this.post(API_ENDPOINTS.VISITS.COMPLETE(visitId), {});
  }

  // Auth API
  async login(email: string, password: string) {
    const response = await this.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.success && response.data?.token) {
      await storage.setAuthToken(response.data.token);
      if (response.data.user) {
        await storage.setUserData(response.data.user);
        if (response.data.user.role) {
          await storage.setUserRole(response.data.user.role);
        }
      }
    }
    return response;
  }

  async signup(userData: any) {
    const response = await this.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    if (response.success && response.data?.token) {
      await storage.setAuthToken(response.data.token);
      if (response.data.user) {
        await storage.setUserData(response.data.user);
        if (response.data.user.role) {
          await storage.setUserRole(response.data.user.role);
        }
      }
    }
    return response;
  }

  async logout() {
    await storage.clearAll();
  }

  // Nurses API
  async getNurses() {
    return this.get(API_ENDPOINTS.NURSES.BASE);
  }

  // Analytics API
  async getParentTrends(parentId: string) {
    return this.get(API_ENDPOINTS.ANALYTICS.PARENT_TRENDS(parentId));
  }
}

export const apiService = new ApiService();
