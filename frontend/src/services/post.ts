import { BaseResponse, PaginateResponse, Post } from "@/@types";
import axiosInstance from "@/lib/axios-instance";
import {
  PostCreateRequest,
  PostParams,
  PostUpdateRequest,
} from "@/lib/validation/post";

export const getPosts = async ({
  page = 1,
  pageSize = 10,
  status = "publish",
}: {
  page?: number;
  pageSize?: number;
  status?: string;
}): Promise<PaginateResponse<Post[]>> => {
  const { data } = await axiosInstance.get<PaginateResponse<Post[]>>(
    `/article?status=${status}&page=${page}&page_size=${pageSize}`
  );

  return data;
};

export const getPostById = async (postId: number): Promise<Post> => {
  const { data } = await axiosInstance.get<BaseResponse<Post>>(
    `/article/${postId}`
  );

  return data.data;
};

export const createPost = async (request: PostCreateRequest): Promise<Post> => {
  const { data } = await axiosInstance.post<BaseResponse<Post>>(
    "/article",
    request
  );

  return data.data;
};

export const updatePost = async ({
  params,
  request,
}: {
  params: PostParams;
  request: PostUpdateRequest;
}): Promise<Post> => {
  const { data } = await axiosInstance.patch<BaseResponse<Post>>(
    `/article/${params.postId}`,
    request
  );

  console.log(data);

  return data.data;
};

export const deletePost = async (params: PostParams): Promise<void> => {
  const { data } = await axiosInstance.delete(`/article/${params.postId}`);

  return data;
};
