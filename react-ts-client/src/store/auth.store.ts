import {
  login,
  register,
  LoginUserAttribtues,
  RegisterUserAttributes,
} from '../services/auth.service';
import { create } from 'zustand';
import { User } from '../models/user.model';
import { AppMessage } from './message.store';
import { devtools } from 'zustand/middleware';
import { handleNetworkError } from '../utils/handle-network-error.util';

export interface AuthStore {
  isLoggedIn: () => boolean;
  authToken: string | null;
  login: (data: LoginUserAttribtues) => Promise<User | AppMessage[]>;
  register: (data: RegisterUserAttributes) => Promise<User | AppMessage[]>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  authToken: localStorage.getItem('authToken'),

  isLoggedIn: (): boolean => {
    return (
      !!localStorage.getItem('authToken') && !!localStorage.getItem('userId')
    );
  },

  login: async (data: LoginUserAttribtues) => {
    try {
      const user = await login(data);

      localStorage.setItem('authToken', user.token as string);
      localStorage.setItem('userId', user.id as string);

      set({ authToken: user.token });

      return <User>user;
    } catch (error: any) {
      return handleNetworkError(error);
    }
  },

  register: async (data: RegisterUserAttributes) => {
    try {
      const user = await register(data);

      localStorage.setItem('authToken', user.token as string);
      localStorage.setItem('userId', user.id as string);

      set({ authToken: user.token });

      return <User>user;
    } catch (error: any) {
      return handleNetworkError(error);
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
