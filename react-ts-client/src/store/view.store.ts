import { create } from 'zustand';

export interface ViewStore {
  view: string | null;
  setView: (view: string) => void;
}

const useViewStore = create<ViewStore>((set) => ({
  view: null,

  setView: (view: string) => set((state) => ({ view })),
}));

export default useViewStore;
