import { create } from "zustand";
import { User } from "../models/user.model";

export interface UserStore {
  user: Partial<User> | null;
  updateUser: (updates: Partial<User>) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  updateUser: (updates: Partial<User>) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  removeUser: () => set((state) => ({ user: null })),
}));

export default useUserStore;
