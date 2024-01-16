import { z } from "zod";

export const postCreateRequest = z.object({
  title: z.string().min(20),
  content: z.string().min(200),
  category: z.string().min(3),
  status: z.string(),
});

export const postUpdateRequest = z.object({
  title: z.string().min(20),
  content: z.string().min(20),
  category: z.string().min(3),
  status: z.string(),
});

export const postParams = z.object({
  postId: z.number(),
});

export type PostCreateRequest = z.infer<typeof postCreateRequest>;
export type PostUpdateRequest = z.infer<typeof postUpdateRequest>;
export type PostParams = z.infer<typeof postParams>;
