import axios from "axios";
import { User } from "../models/user.model";

export const login = async (email: string, password: string): Promise<User> => {
  const res = await axios.post("/api/login", { email, password });
  return res.data;
};

export const register = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await axios.post("/api/register", { email, password });
  return res.data;
};
