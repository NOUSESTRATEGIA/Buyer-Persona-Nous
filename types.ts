export interface PersonaFormData {
  companyName: string;
  companyInfo: string;
  productInfo: string;
  demographics: {
    age: string;
    gender: string;
    location: string;
    income: string;
  };
  professional: {
    jobTitle: string;
    industry: string;
    responsibilities: string;
  };
  goals: string;
  challenges: string;
  values: string;
}

export interface PersonaResult {
  text: string;
  imageUrl: string;
}