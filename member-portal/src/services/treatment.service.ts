import { api, API_ENDPOINTS } from '../config/api';
import { Specialist, TreatmentPackage } from '../types';

export class TreatmentService {
  static async getTreatmentPackages(): Promise<TreatmentPackage[]> {
    const response = await api.get<TreatmentPackage[]>(
      API_ENDPOINTS.treatment.packages
    );
    return response.data;
  }

  static async getTreatmentPackageById(id: number): Promise<TreatmentPackage> {
    const response = await api.get<TreatmentPackage>(
      `${API_ENDPOINTS.treatment.packages}/${id}`
    );
    return response.data;
  }

  static async getSpecialists(): Promise<Specialist[]> {
    const response = await api.get<Specialist[]>(
      API_ENDPOINTS.treatment.specialists
    );
    return response.data;
  }

  static async getSpecialistsBySpecialization(
    specialization: string
  ): Promise<Specialist[]> {
    const response = await api.get<Specialist[]>(
      `${API_ENDPOINTS.treatment.specialists}/specialization/${specialization}`
    );
    return response.data;
  }

  static async getSpecialistById(id: number): Promise<Specialist> {
    const response = await api.get<Specialist>(
      `${API_ENDPOINTS.treatment.specialists}/${id}`
    );
    return response.data;
  }
}