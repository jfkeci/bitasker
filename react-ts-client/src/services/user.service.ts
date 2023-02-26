import { User } from '../models/user.model';
import axiosInstance from '../utils/config/axios.config';

export const getUserById = async (id: string): Promise<User> => {
  const res = await axiosInstance.get(`/api/users/${id}`);
  return res.data;
};

export const updateUser = async (
  id: string,
  user: Partial<User>,
): Promise<User> => {
  const res = await axiosInstance.patch(`/api/users/${id}`, user);
  return res.data;
};
