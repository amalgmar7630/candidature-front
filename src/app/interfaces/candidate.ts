export interface Candidate {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  phone: string;
  years_experience: number;
  availability: number;
  message: string;
  application_status: string;
  cv_file: any;
  filename?: string;
}
