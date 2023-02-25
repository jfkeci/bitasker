import {
  login,
  register,
  LoginUserAttribtues,
  RegisterUserAttributes,
} from '../services/auth.service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AuthStore {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (data: LoginUserAttribtues) => Promise<void>;
  register: (data: RegisterUserAttributes) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  authToken: localStorage.getItem('authToken'),

  login: async (data: LoginUserAttribtues) => {
    try {
      const user = await login(data);

      localStorage.setItem('authToken', user.token as string);

      set({ authToken: user.token });
    } catch (error) {
      console.error(error);
    }
  },

  register: async (data: RegisterUserAttributes) => {
    try {
      const user = await register(data);

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
