import { api, API_ENDPOINTS } from '../config/api';
import { PatientDetail, TreatmentPlan } from '../types';

export class TimetableService {
  static async generateTimetable(patientDetail: PatientDetail): Promise<TreatmentPlan> {
    const response = await api.post<TreatmentPlan>(
      API_ENDPOINTS.timetable.generateTimetable,
      patientDetail
    );
    return response.data;
  }

  static async getAllTreatmentPlans(): Promise<TreatmentPlan[]> {
    const response = await api.get<TreatmentPlan[]>(
      API_ENDPOINTS.timetable.treatments
    );
    return response.data;
  }

  static async getTreatmentPlanById(id: number): Promise<TreatmentPlan> {
    const response = await api.get<TreatmentPlan>(
      `${API_ENDPOINTS.timetable.treatments}/${id}`
    );
    return response.data;
  }

  static async getTreatmentPlansByPatient(patientName: string): Promise<TreatmentPlan[]> {
    const response = await api.get<TreatmentPlan[]>(
      `${API_ENDPOINTS.timetable.treatments}/patient/${patientName}`
    );
    return response.data;
  }
}