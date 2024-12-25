import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { SetState } from './store.interface';
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface';

const onChangeText = (set: SetState<IBasicDetailsStore>) => (values: IBasicDetailsItem) =>
  set({ values });

export const useBasicDetails = create<IBasicDetailsStore>()(
  persist(
    (set) => ({
      values: userDetailsData?.resumeData?.basics,
      reset: onChangeText(set),
    }),
    { name: 'basic' }
  )
);
