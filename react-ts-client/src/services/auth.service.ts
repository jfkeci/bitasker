import axios from 'axios';
import { User } from '../models/user.model';

export interface LoginUserAttribtues {
  email: string;
  password: string;
}

export const login = async (data: LoginUserAttribtues): Promise<User> => {
  const res = await axios.post('/api/login', data);
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
  const res = await axios.post('/api/register', data);
  return res.data;
};
