// certifications.interface.ts

// certifications.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import resumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '@/functions/userDetails';
import { GetState, SetState } from './store.interface';

export interface ICertificationItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  summary: string;
}

export interface ICertificationsStore {
  certifications: ICertificationItem[];
  add: (certification: ICertificationItem) => void;
  get: (index: number) => ICertificationItem;
  remove: (index: number) => void;
  reset: (values: ICertificationItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateCertification: (index: number, updatedInfo: ICertificationItem) => void;
}
const addCertification =
  (set: SetState<ICertificationsStore>) =>
  ({ title, authority, date, summary, id }: ICertificationItem) =>
    set(
      produce((state: ICertificationsStore) => {
        state.certifications.push({
          title,
          authority,
          date,
          summary,
          id,
        });
      })
    );

const removeCertification = (set: SetState<ICertificationsStore>) => (index: number) =>
  set((state) => ({
    certifications: state.certifications
      .slice(0, index)
      .concat(state.certifications.slice(index + 1)),
  }));

const setAllCertifications =
  (set: SetState<ICertificationsStore>) => (values: ICertificationItem[]) => {
    set({
      certifications: values,
    });
  };

const getAllCertifications = (get: GetState<ICertificationsStore>) => (index: number) => {
  return get().certifications[index];
};

const onMoveUp = (set: SetState<ICertificationsStore>) => (index: number) => {
  set(
    produce((state: ICertificationsStore) => {
      if (index > 0) {
        const currentCertification = state.certifications[index];
        state.certifications[index] = state.certifications[index - 1];
        state.certifications[index - 1] = currentCertification;
      }
    })
  );
};

const onMoveDown = (set: SetState<ICertificationsStore>) => (index: number) => {
  set(
    produce((state: ICertificationsStore) => {
      const totalCerts = state.certifications.length;
      if (index < totalCerts - 1) {
        const currentCertification = state.certifications[index];
        state.certifications[index] = state.certifications[index + 1];
        state.certifications[index + 1] = currentCertification;
      }
    })
  );
};

const updateCertification =
  (set: SetState<ICertificationsStore>) => (index: number, updatedInfo: ICertificationItem) => {
    set(
      produce((state: ICertificationsStore) => {
        state.certifications[index] = updatedInfo;
      })
    );
  };

export const useCertifications = create<ICertificationsStore>()(
  persist(
    (set, get) => ({
      certifications: userDetailsData?.resumeData?.certifications || resumeData?.certifications,
      add: addCertification(set),
      get: getAllCertifications(get),
      remove: removeCertification(set),
      reset: setAllCertifications(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateCertification: updateCertification(set),
    }),
    { name: 'certifications' }
  )
);
