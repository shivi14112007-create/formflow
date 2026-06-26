export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Form {
  id: string;
  title: string;
  createdBy: string;
}

export interface Response {
  id: string;
  formId: string;
  submittedAt: string;
}