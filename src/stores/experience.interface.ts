// Base interface for work experience items
export interface IWorkItem {
  id: string;
  name: string;
  position: string;
  url?: string;
  website?: string;
  startDate: string;
  endDate: string;
  isWorkingHere: boolean;
  summary: string;
  highlights: string[];
  years: string;
  type: string;
}

// Store interface for work items
export interface IWorkStore {
  work: IWorkItem[];
  add: (newWork: IWorkItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: IWorkItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateWork: (index: number, updatedInfo: IWorkItem) => void;
}

// Props interface for the WorkSection component
export interface WorkSectionProps {
  work: IWorkItem[];
}

// Props interface for the SectionValidator
export interface SectionValidatorProps {
  value: IWorkItem[];
  children: React.ReactNode;
}

export interface IExperienceItem {
  id: string;
  name: string;
  position: string;
  startDate: string;
  isWorkingHere: boolean;
  endDate: string;
  years: string;
  summary: string;
  url?: string;
  highlights?: string[];
}

export interface IExperienceStore {
  experiences: IExperienceItem[];
  add: (experience: IExperienceItem) => void;
  get: (index: number) => IExperienceItem;
  remove: (index: number) => void;
  reset: (values: IExperienceItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateExperience: (index: number, updatedInfo: IExperienceItem) => void;
}

const NEW_EXPERIENCE: IExperienceItem = {
  name: '',
  position: '',
  startDate: '',
  isWorkingHere: false,
  endDate: '',
  summary: '',
  years: '',
  id: '',
  url: '',
  highlights: [],
};
