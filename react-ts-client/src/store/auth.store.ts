import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { login, register } from '../services/auth.service';

export interface AuthStore {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  authToken: localStorage.getItem('authToken'),

  login: async (email, password) => {
    try {
      const user = await login(email, password);

      localStorage.setItem('authToken', user.token as string);

      set({ authToken: user.token });
    } catch (error) {
      console.error(error);
    }
  },

  register: async (email, password) => {
    try {
      const user = await register(email, password);

      localStorage.setItem('authToken', user.token as string);

      set({ authToken: user.token });
    } catch (error) {
      console.error(error);
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ authToken: null });
  },
}));

if (process.env.NODE_ENV === 'development') {
  devtools(useAuthStore);
}

export default useAuthStore;
