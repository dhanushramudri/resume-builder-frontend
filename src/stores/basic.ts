import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import userDetailsData from '@/functions/userDetails';
import { SetState } from './store.interface';
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface';

const onChangeText = (set: SetState<IBasicDetailsStore>) => (values: IBasicDetailsItem) => {
  set({ values });
};

export const useBasicDetails = create<IBasicDetailsStore>()(
  persist(
    (set) => ({
      values: userDetailsData?.resumeData?.basics,
      reset: onChangeText(set),
      updateValues: (values: IBasicDetailsItem) => {
        set({ values });
      }
    }),
    { name: 'basic' }
  )
);
