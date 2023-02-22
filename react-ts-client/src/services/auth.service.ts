import axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<{ authToken: string }> =>
  await axios.post("/api/login", { email, password });

export const register = async (
  email: string,
  password: string
): Promise<{ authToken: string }> =>
  await axios.post("/api/register", { email, password });
