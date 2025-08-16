import { api, API_ENDPOINTS } from '../config/api';
import { PatientDetail, TreatmentPlan } from '../types';
import { TreatmentService } from './treatment.service';

export class TimetableService {
  static async generateTimetable(patientDetail: PatientDetail): Promise<TreatmentPlan> {
    // Get package name from ID
    const packages = await TreatmentService.getTreatmentPackages();
    const selectedPackage = packages.find(pkg => pkg.id === patientDetail.treatmentPackageId);

    if (!selectedPackage) {
      throw new Error('Treatment package not found');
    }

    // Transform data to match backend expectations
    const backendRequest = {
      name: patientDetail.patientName,
      age: patientDetail.age,
      ailment: patientDetail.ailmentDetails,
      packageName: selectedPackage.name,
      treatmentStartDate: patientDetail.treatmentCommencementDate,
      contactNumber: '', // Optional field
      email: '', // Optional field  
      address: '' // Optional field
    };

    const response = await api.post<TreatmentPlan>(
      API_ENDPOINTS.timetable.generateTimetable,
      backendRequest
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