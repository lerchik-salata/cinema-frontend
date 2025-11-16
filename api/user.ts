import axiosClient from "./axiosClient";
import type { UserResponseDto, UpdateUserDto, ChangePasswordDto } from "../types/user";

const USERS_URL = "/users/me";

export async function getMyProfile(): Promise<UserResponseDto> {
  const { data } = await axiosClient.get<UserResponseDto>(USERS_URL);
  return data;
}

export async function updateMyProfile(updateDto: UpdateUserDto): Promise<UserResponseDto> {
  const { data } = await axiosClient.patch<UserResponseDto>(USERS_URL, updateDto);
  return data;
}

export async function changeMyPassword(
  credentials: ChangePasswordDto,
): Promise<{ message: string }> {
  const { data } = await axiosClient.put<{ message: string }>(`${USERS_URL}/password`, credentials);
  return data;
}

export async function deleteMyProfile(): Promise<{ message: string }> {
  const { data } = await axiosClient.delete<{ message: string }>(USERS_URL);
  return data;
}
