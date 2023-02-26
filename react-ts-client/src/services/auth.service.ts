import { User } from '../models/user.model';
import axiosInstance from '../utils/config/axios.config';

export interface LoginUserAttribtues {
  email: string;
  password: string;
}

export const login = async (data: LoginUserAttribtues): Promise<User> => {
  const res = await axiosInstance.post('/api/auth/login', data);
  return res.data;
};

export interface RegisterUserAttributes {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const register = async (data: RegisterUserAttributes): Promise<User> => {
  const res = await axiosInstance.post('/api/auth/register', data);
  return res.data;
};
