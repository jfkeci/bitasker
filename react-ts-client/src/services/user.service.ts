import axios from "axios";
import { User } from "../models/user.model";

export const getUserById = async (id: string): Promise<User> => {
  const res = await axios.get(`/api/users/${id}`);
  return res.data;
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const res = await axios.patch(`/api/users/${id}`, user);
  return res.data;
};
