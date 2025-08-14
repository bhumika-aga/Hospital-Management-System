import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { ClaimInitiationRequest, ClaimRequest, Insurer } from '../types';

const insuranceApi = axios.create({
  baseURL: API_ENDPOINTS.insurance.base,
});

// Add token to requests
insuranceApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export class InsuranceService {
  static async initiateClaim(request: ClaimInitiationRequest): Promise<ClaimRequest> {
    const response = await insuranceApi.post<ClaimRequest>(
      API_ENDPOINTS.insurance.initiateClaim,
      request
    );
    return response.data;
  }

  static async getAllInsurers(): Promise<Insurer[]> {
    const response = await insuranceApi.get<Insurer[]>(
      API_ENDPOINTS.insurance.insurers
    );
    return response.data;
  }

  static async getInsurerById(id: number): Promise<Insurer> {
    const response = await insuranceApi.get<Insurer>(
      `${API_ENDPOINTS.insurance.insurers}/${id}`
    );
    return response.data;
  }

  static async getAllClaims(): Promise<ClaimRequest[]> {
    const response = await insuranceApi.get<ClaimRequest[]>(
      API_ENDPOINTS.insurance.claims
    );
    return response.data;
  }

  static async getClaimById(id: number): Promise<ClaimRequest> {
    const response = await insuranceApi.get<ClaimRequest>(
      `${API_ENDPOINTS.insurance.claims}/${id}`
    );
    return response.data;
  }

  static async getClaimsByPatient(patientName: string): Promise<ClaimRequest[]> {
    const response = await insuranceApi.get<ClaimRequest[]>(
      `${API_ENDPOINTS.insurance.claims}/patient/${patientName}`
    );
    return response.data;
  }
}