import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { TokenRequest, TokenResponse } from '../types';

const authApi = axios.create({
  baseURL: API_ENDPOINTS.auth.base,
});

export class AuthService {
  static async generateToken(request: TokenRequest): Promise<TokenResponse> {
    const response = await authApi.post<TokenResponse>(
      API_ENDPOINTS.auth.generateToken,
      request
    );
    return response.data;
  }

  static async checkHealth(): Promise<string> {
    const response = await authApi.get<string>(API_ENDPOINTS.auth.health);
    return response.data;
  }

  static setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static removeToken(): void {
    localStorage.removeItem('authToken');
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined && token !== '';
  }
}