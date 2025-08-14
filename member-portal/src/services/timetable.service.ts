import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { PatientDetail, TreatmentPlan } from '../types';

const timetableApi = axios.create({
  baseURL: API_ENDPOINTS.timetable.base,
});

// Add token to requests
timetableApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export class TimetableService {
  static async generateTimetable(patientDetail: PatientDetail): Promise<TreatmentPlan> {
    const response = await timetableApi.post<TreatmentPlan>(
      API_ENDPOINTS.timetable.generateTimetable,
      patientDetail
    );
    return response.data;
  }

  static async getAllTreatmentPlans(): Promise<TreatmentPlan[]> {
    const response = await timetableApi.get<TreatmentPlan[]>(
      API_ENDPOINTS.timetable.treatments
    );
    return response.data;
  }

  static async getTreatmentPlanById(id: number): Promise<TreatmentPlan> {
    const response = await timetableApi.get<TreatmentPlan>(
      `${API_ENDPOINTS.timetable.treatments}/${id}`
    );
    return response.data;
  }

  static async getTreatmentPlansByPatient(patientName: string): Promise<TreatmentPlan[]> {
    const response = await timetableApi.get<TreatmentPlan[]>(
      `${API_ENDPOINTS.timetable.treatments}/patient/${patientName}`
    );
    return response.data;
  }
}