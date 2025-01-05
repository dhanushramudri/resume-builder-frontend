// education.interface.ts
export interface IEducation {
  id: string;
  institution: string;
  url?: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score?: string;
  specialization?: string;
  passOutYear?: string;
  courses?: string[]; // Making it required but can be empty array
  isStudyingHere: boolean;
  level?: 'secondary' | 'graduation';
}
export interface EducationSectionProps {
  education?: IEducation[];
}

export interface EducationComponentProps {
  educationInfo: IEducation;
  currentIndex: number;
  onUpdate: (updatedEducation: IEducation) => void;
}
