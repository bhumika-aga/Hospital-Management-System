import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { Specialist, TreatmentPackage } from '../types';

const treatmentApi = axios.create({
  baseURL: API_ENDPOINTS.treatment.base,
});

// Add token to requests
treatmentApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export class TreatmentService {
  static async getTreatmentPackages(): Promise<TreatmentPackage[]> {
    const response = await treatmentApi.get<TreatmentPackage[]>(
      API_ENDPOINTS.treatment.packages
    );
    return response.data;
  }

  static async getTreatmentPackageById(id: number): Promise<TreatmentPackage> {
    const response = await treatmentApi.get<TreatmentPackage>(
      `${API_ENDPOINTS.treatment.packages}/${id}`
    );
    return response.data;
  }

  static async getSpecialists(): Promise<Specialist[]> {
    const response = await treatmentApi.get<Specialist[]>(
      API_ENDPOINTS.treatment.specialists
    );
    return response.data;
  }

  static async getSpecialistsBySpecialization(
    specialization: string
  ): Promise<Specialist[]> {
    const response = await treatmentApi.get<Specialist[]>(
      `${API_ENDPOINTS.treatment.specialists}/specialization/${specialization}`
    );
    return response.data;
  }

  static async getSpecialistById(id: number): Promise<Specialist> {
    const response = await treatmentApi.get<Specialist>(
      `${API_ENDPOINTS.treatment.specialists}/${id}`
    );
    return response.data;
  }
}