export interface User {
  username: string;
  token?: string;
}

export interface TreatmentPackage {
  id: number;
  specialization: string;
  name: string;
  tests: string[];
  cost: number;
  durationWeeks: number;
  packageLevel: number;
}

export interface Specialist {
  id: number;
  name: string;
  specialization: string;
  level: 'JUNIOR' | 'SENIOR';
  qualification: string;
  experience: number;
  contactNumber: string;
  email: string;
  available: boolean;
}

export interface PatientDetail {
  patientName: string;
  age: number;
  ailmentDetails: string;
  treatmentPackageId: number;
  treatmentCommencementDate: string;
}

export interface TreatmentPlan {
  id: number;
  patientName?: string;
  name?: string; // Alternative field from backend
  age: number;
  ailmentDetails?: string;
  ailment?: string; // Alternative field from backend
  treatmentPackage?: TreatmentPackage;
  treatmentPackageName?: string; // Alternative field from backend
  specialist?: Specialist;
  treatmentCommencementDate?: string;
  treatmentStartDate?: string; // Alternative field from backend
  treatmentEndDate: string;
  durationWeeks?: number;
}

export interface Insurer {
  id: number;
  insurerName: string;
  insurerContactNumber: string;
  insurerAddress: string;
  maxCashlessAmount: number;
  postTreatmentCashlessAmount: number;
}

export interface ClaimRequest {
  id: number;
  patientName: string;
  treatmentCost: number;
  insurerId: number;
  insurer?: Insurer;
  claimStatus: 'INITIATED' | 'APPROVED' | 'REJECTED';
  claimAmount: number;
  dateOfClaim: string;
}

export interface ClaimInitiationRequest {
  patientName: string;
  ailment: string;
  treatmentPackageName: string;
  insurerName: string;
  treatmentCost: number;
  patientId?: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface TokenRequest {
  username: string;
}

export interface TokenResponse {
  token: string;
  expiresIn: number;
}

// Form types
export interface LoginForm {
  username: string;
}

export interface PatientForm {
  patientName: string;
  age: number;
  ailmentDetails: string;
  treatmentPackageId: number;
  treatmentCommencementDate: string;
}

export interface ClaimForm {
  patientName: string;
  ailment: string;
  treatmentPackageName: string;
  insurerId: string;
  treatmentCost: number;
}

// Navigation types
export interface NavigationItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
}

// Table types
export interface TableColumn<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

// Theme types
export interface CustomTheme {
  isDark: boolean;
  toggleTheme: () => void;
}