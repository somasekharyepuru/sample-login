export interface User {
  id: string;
  userName: string;
  password: string;
  email: string;
  role: string;
  personalInfo?: PersonalInfo
}

export interface PersonalInfo {
  dob: string;
  mobile: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  rating: string;
}
