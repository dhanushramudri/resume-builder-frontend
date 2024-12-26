// Education Types
export interface IEducation {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
  isStudyingHere?: boolean;
  url?: string;
}

export interface EducationSectionProps {
  education?: IEducation[];
}
