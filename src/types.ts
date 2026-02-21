export interface Option {
  id: string;
  text: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Profile {
  id: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  diagnosis: string;
  alert?: string;
  recommendation: string;
}
