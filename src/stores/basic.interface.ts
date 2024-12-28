import { IBasics } from '@/types/basics';

export interface IBasicDetailsItem extends IBasics {
  firstName: string;
  lastName: string;
  education: {
    college: string;
    specialization: string;
    course: string;
    branch: string;
    passOutYear: string;
    cgpa: string;
  };
  gender: string;
  genderOther: string;
  dateOfBirth: string;
  jobPreferredCountries: string[];
  jobPreferredStates: string[];
  jobPreferredCities: string[];
  objective: string;
}

export interface IBasicDetailsStore {
  values: IBasicDetailsItem;
  reset: (values: IBasicDetailsItem) => void;
  updateValues: (values: IBasicDetailsItem) => void;
}
