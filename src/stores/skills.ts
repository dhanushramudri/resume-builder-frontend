import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { GetState, SetState } from './store.interface';
import { ISkillItem, ISkillState } from './skill.interface';

type SkillKeys =
  | 'languages'
  | 'frameworks'
  | 'technologies'
  | 'libraries'
  | 'databases'
  | 'practices'
  | 'tools';

const getFallbackSkills = (key: SkillKeys) => {
  return userDetailsData?.resumeData?.skills?.[key] || resumeData?.skills[key];
};

const createMethods = (set: SetState<ISkillState>, get: GetState<ISkillState>) => ({
  get: () => (get().isEnabled ? get().values : []),
  add: ({ name, level }: ISkillItem) =>
    set(
      produce((state: ISkillState) => {
        state.values.push({ name, level });
        updateLocalStorage(state.title.toLowerCase(), state.values);
      })
    ),
  remove: (index: number) =>
    set(
      produce((state: ISkillState) => {
        state.values.splice(index, 1);
        updateLocalStorage(state.title.toLowerCase(), state.values);
      })
    ),
  edit: ({ name, level, index }: { name: string; level: number; index: number }) =>
    set(
      produce((state: ISkillState) => {
        state.values[index] = { name, level };
        updateLocalStorage(state.title.toLowerCase(), state.values);
      })
    ),
  reset: (values: ISkillItem[]) =>
    set(() => {
      const newState = { values };
      updateLocalStorage(get().title.toLowerCase(), values);
      return newState;
    }),
  setIsEnabled: (isEnabled: boolean) => set(() => ({ isEnabled })),
});

const updateLocalStorage = (skillType: string, values: ISkillItem[]) => {
  const existingData = localStorage.getItem('userDetailsData');
  if (existingData) {
    const parsedData = JSON.parse(existingData);
    const updatedData = {
      ...parsedData,
      resumeData: {
        ...parsedData.resumeData,
        skills: {
          ...parsedData.resumeData.skills,
          [skillType]: values,
        },
      },
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
  }
};

const createSkillStore = (title: string, hasLevel: boolean, key: SkillKeys) =>
  create<ISkillState>()(
    persist(
      (set, get) => ({
        title,
        hasLevel,
        values: getFallbackSkills(key),
        isEnabled: true,
        ...createMethods(set, get),
      }),
      { name: key }
    )
  );

export const useLanguages = createSkillStore('Languages', true, 'languages');
export const useFrameworks = createSkillStore('Frameworks', true, 'frameworks');
export const useTechnologies = createSkillStore('Technologies', false, 'technologies');
export const useLibraries = createSkillStore('Libraries', false, 'libraries');
export const useDatabases = createSkillStore('Databases', false, 'databases');
export const usePractices = createSkillStore('Practices', false, 'practices');
export const useTools = createSkillStore('Tools', false, 'tools');
