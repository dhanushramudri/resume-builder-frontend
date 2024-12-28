// education.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { IEducation } from './education.interface';

interface IEducationStore {
  educations: IEducation[];
  add: (education: IEducation) => void;
  remove: (index: number) => void;
  updateEducation: (index: number, updatedInfo: IEducation) => void;
  get: (index: number) => IEducation;
  reset: (values: IEducation[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
}

const createMethods = (set: any, get: any) => ({
  add: (education: IEducation) =>
    set(
      produce((state: IEducationStore) => {
        state.educations.push(education);
      })
    ),

  remove: (index: number) =>
    set(
      produce((state: IEducationStore) => {
        state.educations.splice(index, 1);
      })
    ),

  updateEducation: (index: number, updatedInfo: IEducation) =>
    set(
      produce((state: IEducationStore) => {
        state.educations[index] = { ...state.educations[index], ...updatedInfo };
      })
    ),

  get: (index: number) => get().educations[index],

  reset: (values: IEducation[]) =>
    set(
      produce((state: IEducationStore) => {
        state.educations = values;
      })
    ),

  onmoveup: (index: number) =>
    set(
      produce((state: IEducationStore) => {
        if (index > 0) {
          [state.educations[index], state.educations[index - 1]] = [
            state.educations[index - 1],
            state.educations[index],
          ];
        }
      })
    ),

  onmovedown: (index: number) =>
    set(
      produce((state: IEducationStore) => {
        if (index < state.educations.length - 1) {
          [state.educations[index], state.educations[index + 1]] = [
            state.educations[index + 1],
            state.educations[index],
          ];
        }
      })
    ),
});

export const useEducations = create<IEducationStore>()(
  persist(
    (set, get) => ({
      educations: userDetailsData?.resumeData?.education || resumeData?.education || [],
      ...createMethods(set, get),
    }),
    {
      name: 'education',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
