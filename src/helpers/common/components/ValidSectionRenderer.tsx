import { Fragment, ReactNode, useMemo } from 'react';
import { IWorkItem } from '@/stores/experience.interface';
import { IEducationItem } from '@/stores/education.interface';
import { IAwardItem } from '@/stores/awards.interface';
import { IVolunteeringItem } from '@/stores/volunteering.interface';
import { ISkillItem } from '@/stores/skill.interface';
import { IVolunteer } from '@/stores/index.interface';

// Define a single type for all valid section values
export type ValidSectionValue =
  | string
  | IWorkItem[]
  | IEducationItem[]
  | IAwardItem[]
  | IVolunteeringItem[]
  | IVolunteer[]
  | ISkillItem[];

// Single definition of SectionValidatorProps
interface SectionValidatorProps {
  value: ValidSectionValue;
  children: ReactNode;
}

export interface WorkSectionProps {
  work: IWorkItem[];
}
// Component props interfaces
interface EducationSectionProps {
  education: IEducationItem[];
}

interface VolunteerSectionProps {
  volunteer: IVolunteer[];
}

export const SectionValidator: React.FC<SectionValidatorProps> = ({ value, children }) => {
  const isValid = useMemo(() => {
    return (value || '').length > 0;
  }, [value]);

  if (!isValid) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
