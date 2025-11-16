export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto extends LoginDto {
  username: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
