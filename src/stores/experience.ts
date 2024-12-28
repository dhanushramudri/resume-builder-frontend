// experience.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { IExperienceItem, IExperienceStore } from './experience.interface';

const createMethods = (set: any, get: any) => ({
  add: (experience: IExperienceItem) =>
    set(
      produce((state: IExperienceStore) => {
        state.experiences.push(experience);
      })
    ),

  remove: (index: number) =>
    set((state: IExperienceStore) => ({
      experiences: state.experiences.filter((_, i) => i !== index),
    })),

  updateExperience: (index: number, updatedInfo: IExperienceItem) =>
    set(
      produce((state: IExperienceStore) => {
        state.experiences[index] = updatedInfo;
      })
    ),

  get: (index: number) => get().experiences[index],

  reset: (values: IExperienceItem[]) =>
    set(() => ({
      experiences: values,
    })),

  onmoveup: (index: number) =>
    set(
      produce((state: IExperienceStore) => {
        if (index > 0) {
          [state.experiences[index], state.experiences[index - 1]] = [
            state.experiences[index - 1],
            state.experiences[index],
          ];
        }
      })
    ),

  onmovedown: (index: number) =>
    set(
      produce((state: IExperienceStore) => {
        if (index < state.experiences.length - 1) {
          [state.experiences[index], state.experiences[index + 1]] = [
            state.experiences[index + 1],
            state.experiences[index],
          ];
        }
      })
    ),
});

export const useExperiences = create<IExperienceStore>()(
  persist(
    (set, get) => ({
      experiences: userDetailsData?.resumeData?.work || resumeData?.work,
      ...createMethods(set, get),
    }),
    {
      name: 'experience',
    }
  )
);
