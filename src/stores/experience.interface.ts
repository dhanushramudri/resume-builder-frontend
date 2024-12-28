// experience.interface.ts
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

export interface IExperienceProps {
  experience: IExperienceItem;
  index: number;
  expanded: boolean;
  onChange: (id: string, isExpanded: boolean) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onUpdate: (updatedExperience: IExperienceItem) => void;
}

export interface IAddExperienceProps {
  onSave: (experience: IExperienceItem) => void;
}

export const NEW_EXPERIENCE: IExperienceItem = {
  id: '',
  name: '',
  position: '',
  startDate: '',
  isWorkingHere: false,
  endDate: '',
  summary: '',
  years: '',
  url: '',
  highlights: [],
};
