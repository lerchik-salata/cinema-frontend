export interface PostInterface {
  _id: number;
  threadId: number;
  authorId: string;
  content: string;
  parentPostId: number | null;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdatePostDto {
  content: string;
}

export interface CreatePostDto {
  content: string;
  parentPostId?: number;
}
