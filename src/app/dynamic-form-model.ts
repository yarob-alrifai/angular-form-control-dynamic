export type DynamicControlType = 'text' | 'checkbox' | 'checkbox-list' | 'radio' | 'range';

export interface DynamicControl {
  type: DynamicControlType;
  name: string;
  label: string;
  defaultValue?: any;
  options?: string[]; 
  min?: number; 
  max?: number; 
}


export const DYNAMIC_FORM_MODEL: DynamicControl[] = [

  { type: 'text', name: 'firstName', label: 'First Name', defaultValue: '' },
  { type: 'text', name: 'lastName', label: 'Last Name', defaultValue: '' },
  { type: 'text', name: 'email', label: 'Email', defaultValue: '' },
  { type: 'text', name: 'city', label: 'City', defaultValue: '' },

  // checkbox 
  {
    type: 'checkbox',
    name: 'agreeTerms',
    label: 'Agree to Terms and Conditions',
    defaultValue: false,
  },

  // checkbox list
  {
    type: 'checkbox-list',
    name: 'skills',
    label: 'Your Skills',
    options: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue'],
    defaultValue: [],
  },

  // radio
  {
    type: 'radio',
    name: 'employmentStatus',
    label: 'Employment Status',
    options: ['Employed', 'Unemployed', 'Student', 'Freelancer'],
    defaultValue: '',
  },

  // range
  {
    type: 'range',
    name: 'experience',
    label: 'Years of Experience',
    min: 0,
    max: 20,
    defaultValue: 5,
  },

  // checkbox list
  {
    type: 'checkbox-list',
    name: 'preferredLanguages',
    label: 'Preferred Programming Languages',
    options: ['Python', 'C#', 'Java', 'Go', 'Rust'],
    defaultValue: [],
  },

  // radio 
  {
    type: 'radio',
    name: 'workEnvironment',
    label: 'Preferred Work Environment',
    options: ['Remote', 'On-Site', 'Hybrid'],
    defaultValue: '',
  },

  // checkbox 
  {
    type: 'checkbox',
    name: 'newsletter',
    label: 'Receive Newsletter',
    defaultValue: true,
  },
];
