import axios from "axios";
import { User } from "../models/user.model";

export const fetchUserById = async (id: string, token: string): Promise<User> =>
  await axios.get(`/api/users/${id}`);
