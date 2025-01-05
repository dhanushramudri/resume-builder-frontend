import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { GetState, SetState } from './store.interface';
import { IVolunteeringItem, IVolunteeringStore } from './volunteering.interface';

const createVolunteeringStore = (
  set: SetState<IVolunteeringStore>,
  get: GetState<IVolunteeringStore>
): IVolunteeringStore => ({
  volunteeredExps: userDetailsData?.resumeData?.volunteer || resumeData?.volunteer || [],

  add: (newVolunteering: IVolunteeringItem) =>
    set(
      produce((state) => {
        state.volunteeredExps.push(newVolunteering);
      })
    ),

  remove: (index: number) =>
    set(
      produce((state) => {
        state.volunteeredExps = state.volunteeredExps.filter((_: any, i: number) => i !== index);
      })
    ),

  reset: (values: IVolunteeringItem[]) => set({ volunteeredExps: values }),

  get: (index: number) => get().volunteeredExps[index],

  updateVolunteeringExp: (index: number, updatedInfo: IVolunteeringItem) =>
    set(
      produce((state) => {
        state.volunteeredExps[index] = updatedInfo;
      })
    ),

  onmoveup: (index: number) =>
    set(
      produce((state) => {
        if (index > 0) {
          [state.volunteeredExps[index], state.volunteeredExps[index - 1]] = [
            state.volunteeredExps[index - 1],
            state.volunteeredExps[index],
          ];
        }
      })
    ),

  onmovedown: (index: number) =>
    set(
      produce((state) => {
        if (index < state.volunteeredExps.length - 1) {
          [state.volunteeredExps[index], state.volunteeredExps[index + 1]] = [
            state.volunteeredExps[index + 1],
            state.volunteeredExps[index],
          ];
        }
      })
    ),
});

export const useVolunteeringStore = create<IVolunteeringStore>()(
  persist((set, get) => createVolunteeringStore(set, get), { name: 'volunteering' })
);
