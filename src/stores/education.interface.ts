// education.interface.ts
export interface IEducation {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[] | undefined; // Changed to match IEducation
  isStudyingHere?: boolean;
  url?: string;
}

export interface EducationSectionProps {
  education?: IEducation[];
}

export interface EducationComponentProps {
  educationInfo: IEducation;
  currentIndex: number;
  onUpdate: (updatedEducation: IEducation) => void;
}
