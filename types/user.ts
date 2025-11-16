import { UserRole } from "./auth";

export interface UserResponseDto {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
}

export interface ChangePasswordDto {
  newPassword: string;
}
