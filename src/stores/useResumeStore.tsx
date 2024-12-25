import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import ResumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { useActivity } from './activity';
import { useAwards } from './awards';
import { useBasicDetails } from './basic';
import { useEducations } from './education';
import { useExperiences } from './experience';
import { useVoluteeringStore } from './volunteering';

export const useResumeStore = () => {
  const userData = userDetailsData?.resumeData || ResumeData; // Use userDetailsData.resumeData as original, fallback to ResumeData

  return {
    ...userData,
    basics: useBasicDetails((state) => state.values),
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    awards: useAwards((state) => state.awards),
    volunteer: useVoluteeringStore((state) => state.volunteeredExps),
    skills: {
      languages: useLanguages((state) => state.get()),
      frameworks: useFrameworks((state) => state.get()),
      technologies: useTechnologies((state) => state.get()),
      libraries: useLibraries((state) => state.get()),
      databases: useDatabases((state) => state.get()),
      practices: usePractices((state) => state.get()),
      tools: useTools((state) => state.get()),
    },
    activities: useActivity((state) => state.get()),
  };
};

/**
 * @description Reset all the stores
 */
export const resetResumeStore = () => {
  const userData = userDetailsData?.resumeData || ResumeData; // Use userDetailsData.resumeData as original, fallback to ResumeData

  useBasicDetails.getState().reset(userData.basics);
  useLanguages.getState().reset(userData.skills.languages);
  useFrameworks.getState().reset(userData.skills.frameworks);
  useLibraries.getState().reset(userData.skills.libraries);
  useDatabases.getState().reset(userData.skills.databases);
  useTechnologies.getState().reset(userData.skills.technologies);
  usePractices.getState().reset(userData.skills.practices);
  useTools.getState().reset(userData.skills.tools);
  useExperiences.getState().reset(userData.work);
  useEducations.getState().reset(userData.education);
  useVoluteeringStore.getState().reset(userData.volunteer);
  useAwards.getState().reset(userData.awards);
  useActivity.getState().reset(userData.activities);
};
