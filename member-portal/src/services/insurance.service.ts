import { api, API_ENDPOINTS } from '../config/api';
import { ClaimInitiationRequest, ClaimRequest, Insurer } from '../types';

export class InsuranceService {
  static async initiateClaim(request: ClaimInitiationRequest): Promise<ClaimRequest> {
    const response = await api.post<ClaimRequest>(
      API_ENDPOINTS.insurance.initiateClaim,
      request
    );
    return response.data;
  }

  static async getAllInsurers(): Promise<Insurer[]> {
    const response = await api.get<Insurer[]>(
      API_ENDPOINTS.insurance.insurers
    );
    return response.data;
  }

  static async getInsurerById(id: number): Promise<Insurer> {
    const response = await api.get<Insurer>(
      `${API_ENDPOINTS.insurance.insurers}/${id}`
    );
    return response.data;
  }

  static async getAllClaims(): Promise<ClaimRequest[]> {
    const response = await api.get<ClaimRequest[]>(
      API_ENDPOINTS.insurance.claims
    );
    return response.data;
  }

  static async getClaimById(id: number): Promise<ClaimRequest> {
    const response = await api.get<ClaimRequest>(
      `${API_ENDPOINTS.insurance.claims}/${id}`
    );
    return response.data;
  }

  static async getClaimsByPatient(patientName: string): Promise<ClaimRequest[]> {
    const response = await api.get<ClaimRequest[]>(
      `${API_ENDPOINTS.insurance.claims}/patient/${patientName}`
    );
    return response.data;
  }
}