export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string;
}