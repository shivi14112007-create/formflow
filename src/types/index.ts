export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'number';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // Used for select, checkbox, radio
  helpText?: string;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: string;
  submissionsCount: number;
  status: 'active' | 'draft' | 'archived';
}

export interface SubmissionResponse {
  id: string;
  submittedAt: string;
  data: Record<string, any>;
  browser: string;
  device: string;
  location: string;
}

export interface FormAnalytics {
  views: number;
  submissions: number;
  conversionRate: number; // percentage
  averageTimeSeconds: number;
  submissionsOverTime: { date: string; count: number }[];
  submissionsByBrowser: { name: string; value: number }[];
  submissionsByDevice: { name: string; value: number }[];
}
