import dayjs from 'dayjs';

// interface ILocation {
//   address: string;
//   postalCode: string;
//   city: string;
//   countryCode: string;
//   region: string;
// }

// interface IProfile {
//   network: string;
//   username: string;
//   url: string;
// }

interface ResumeData {
  basics?: IBasics; // Using the existing IBasics interface
  skills?: {
    languages: Array<{ name: string; level: number }>;
    frameworks: Array<{ name: string; level: number }>;
    technologies: Array<{ name: string; level: number }>;
    libraries: Array<{ name: string; level: number }>;
    databases: Array<{ name: string; level: number }>;
    practices: Array<{ name: string; level: number }>;
    tools: Array<{ name: string; level: number }>;
  };
  work?: Array<any>;
  volunteer?: Array<{
    id: string;
    organization: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    summary: string;
    isVolunteeringNow: boolean;
    highlights: string[];
  }>;
  certifications?: Array<{
    id: string;
    title: string;
    date: string;
    authority: string;
    summary: string;
  }>;
  activities?: {
    involvements?: string[];
    achievements?: string[];
  };
  education?: IEducation[];
  awards?: Array<any>;
}

interface ILocation {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface IProfile {
  network: string;
  username: string;
  url: string;
}

export interface IBasics {
  firstName: string;
  lastName: string;
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  college: string;
  specialization: string;
  course: string;
  branch: string;
  passOutYear: string;
  cgpa: string;
  gender: string;
  genderOther: string;
  dateOfBirth: string;
  jobPreferredCountries: string[];
  jobPreferredStates: string[];
  jobPreferredCities: string[];
  location: ILocation;
  relExp: string;
  totalExp: string;
  objective: string;
  profiles: IProfile[];
}

export interface IItem {
  name: string;
  level: number;
}

export interface ISkillsIntrf {
  languages: IItem[];
  frameworks: IItem[];
  technologies: IItem[];
  libraries: IItem[];
  databases: IItem[];
  tools: IItem[];
  practices: IItem[];
}

export interface IWorkIntrf {
  id: string;
  name: string;
  position: string;
  url: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  summary: string;
  years: string;
  highlights: string[];
  isWorkingHere: boolean;
  website: string;
}

export interface IEducation {
  id: string;
  institution: string;
  url?: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score?: string;
  courses?: string[]; // Changed to match IEducation
  isStudyingHere: boolean;
}

export interface IVolunteer {
  id: string;
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary: string;
  isVolunteeringNow: boolean; // Changed from isVolunteeringHere to match your component
}
interface IAwardRaw {
  id: string;
  title: string;
  awarder: string;
  date: string;
  summary: string;
}

// Interface for the processed data
export interface IAward {
  id: string;
  title: string;
  awarder: string;
  date: dayjs.Dayjs;
  summary: string;
}
export const transformAwards = (awards: IAwardRaw[]): IAward[] => {
  return awards.map((award) => ({
    ...award,
    date: dayjs(award.date),
  }));
};

export interface IResume {
  basics: IBasics;
  skills: ISkillsIntrf;
  work: IWorkIntrf[];
  education: IEducation[];
}
