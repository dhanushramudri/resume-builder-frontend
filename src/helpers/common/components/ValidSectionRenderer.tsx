import { Fragment, ReactNode, useMemo } from 'react';
import { IExperienceItem } from '@/stores/experience.interface';
import { IEducation } from '@/stores/education.interface';
import { IAwardItem } from '@/stores/awards.interface';
import { IVolunteeringItem } from '@/stores/volunteering.interface';
import { ISkillItem } from '@/stores/skill.interface';
import { IVolunteer } from '@/stores/index.interface';
import { ICertificationItem } from '@/stores/certifications';

// Define a single type for all valid section values
export type ValidSectionValue =
  | string
  | string[]
  | boolean
  | IExperienceItem[]
  | IEducation[]
  | IAwardItem[]
  | IVolunteeringItem[]
  | IVolunteer[]
  | ISkillItem[]
  | ICertificationItem[];

// Single definition of SectionValidatorProps
interface SectionValidatorProps {
  value: ValidSectionValue;
  children: ReactNode;
}

export interface WorkSectionProps {
  work: IExperienceItem[];
}
// Component props interfaces
interface EducationSectionProps {
  education: IEducation[];
}

interface VolunteerSectionProps {
  volunteer: IVolunteer[];
}

export const SectionValidator: React.FC<SectionValidatorProps> = ({ value, children }) => {
  const isValid = useMemo(() => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  }, [value]);

  if (!isValid) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
