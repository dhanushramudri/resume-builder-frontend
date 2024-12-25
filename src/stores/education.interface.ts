// Education Types
export interface IEducationItem {
  id: string;
  institution: string;
  url: string;
  studyType: string;
  area: string;
  startDate: string | null;
  endDate: string | null;
  score: string;
  courses: string[];
  isStudyingHere: boolean;
  level?: string; // Made optional since it's not in original interface
}

export interface IEducationStore {
  academics: IEducationItem[];
  add: (newEducation: IEducationItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: IEducationItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateEducation: (index: number, updatedInfo: IEducationItem) => void;
}
