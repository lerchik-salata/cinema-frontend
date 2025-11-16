import axiosClient from "./axiosClient";
import type { CreateUserDto, LoginDto } from "../types/auth";

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export async function registerUser(credentials: CreateUserDto): Promise<AuthResponse> {
  const { data } = await axiosClient.post<AuthResponse>("/auth/register", credentials);
  return data;
}

export async function loginUser(credentials: LoginDto): Promise<AuthResponse> {
  const { data } = await axiosClient.post<AuthResponse>("/auth/login", credentials);
  return data;
}
