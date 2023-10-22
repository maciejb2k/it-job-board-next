import { create } from 'zustand';

type JobOffers = {
  employmentType: string;
  setEmploymentType: (type: string) => void;
};

export const useJobOffersStore = create<JobOffers>((set) => ({
  employmentType: 'uop',
  setEmploymentType: (type) => set({ employmentType: type }),
}));
