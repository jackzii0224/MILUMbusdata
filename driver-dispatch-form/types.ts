export interface DriverData {
  id: string;
  driverName: string;
  busNo: string;
  headCountMillMineUp: string;
  headCountMillMineDown: string;
  othersUp: string;
  othersDown: string;
  destination: string;
  comments: string;
}

export interface EscortData {
  key: string;
  id: string;
  value: string;
}

export interface FormData {
  drivers1: DriverData[];
  drivers2: DriverData[];
  escorts: EscortData[];
  comments: string;
  rdo: string;
  spareDriver: string;
  sickAbsent: string;
}

export interface User {
  username: string;
  role: 'user' | 'admin';
}

export interface Submission {
  id: string;
  username: string;
  submittedAt: string;
  formData: FormData;
}
