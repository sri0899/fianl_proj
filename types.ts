
export type Language = 'en' | 'ta' | 'hi';

export type UserCategory = 'Student' | 'Farmer' | 'Senior Citizen' | 'Working' | 'Unemployed' | 'Entrepreneur';

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  state: string;
  incomeRange: string;
  category: UserCategory;
  language: Language;
}

export interface Scheme {
  id: string;
  nameEn: string;
  nameTa: string;
  nameHi: string;
  category: string;
  minAge: number;
  maxAge?: number;
  maxIncome?: number;
  eligibleCategories: UserCategory[];
  descriptionEn: string;
  descriptionTa: string;
  descriptionHi: string;
  benefitsEn: string[];
  benefitsTa: string[];
  benefitsHi: string[];
  eligibilityEn: string[];
  eligibilityTa: string[];
  eligibilityHi: string[];
  documentsEn: string[];
  documentsTa: string[];
  documentsHi: string[];
  officialUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  attachments?: { data: string; mimeType: string; name: string }[];
}
