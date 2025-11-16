import axiosClient from "./axiosClient";
import type { UserResponseDto } from "../types/user";
import type { PostInterface, UpdatePostDto } from "../types/forums";

const ADMIN_URL = "/admin";

export async function getAllUsers(): Promise<UserResponseDto[]> {
  const { data } = await axiosClient.get<UserResponseDto[]>(`${ADMIN_URL}/users`);
  return data;
}

export async function deleteUser(userId: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete<{ message: string }>(`${ADMIN_URL}/users/${userId}`);
  return data;
}

export async function getAllForumPosts(): Promise<PostInterface[]> {
  const { data } = await axiosClient.get<PostInterface[]>(`${ADMIN_URL}/forums/posts`);
  return data;
}

export async function updateForumPost(
  postId: string,
  updateDto: UpdatePostDto,
): Promise<PostInterface> {
  const { data } = await axiosClient.patch<PostInterface>(
    `${ADMIN_URL}/forums/posts/${postId}`,
    updateDto,
  );
  return data;
}

export async function deleteForumPost(postId: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete<{ message: string }>(
    `${ADMIN_URL}/forums/posts/${postId}`,
  );
  return data;
}
