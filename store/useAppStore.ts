// store/useAppStore.ts
import { create } from 'zustand';

type UserType = 'client' | 'tradesperson' | null;

type AppState = {
  userType: UserType;
  clientJobPosted: boolean;
  setUserType: (type: UserType) => void;
  setClientJobPosted: (posted: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  userType: null,
  clientJobPosted: false,
  setUserType: (type) => set({ userType: type }),
  setClientJobPosted: (posted) => set({ clientJobPosted: posted }),
}));
