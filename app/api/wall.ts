import axiosInstace from "./axiosInstance";
import { PaginatedPostsResponse } from "./type/apiType";
import { QueryFunctionContext } from "@tanstack/react-query"; // 타입 import
import { NewPostPayload } from "./type/apiType";
import * as SecureStore from "expo-secure-store"; // SecureStore import
import { Alert } from "react-native";
import { PatchPost } from "./type/apiType";
import axios from "axios";
import { PostDetailResponse } from "./type/apiType";

export const fetchPosts = async (
  context: QueryFunctionContext
): Promise<PaginatedPostsResponse> => {
  const pageParam = context.pageParam || 0;

  const response = await axiosInstace.get<PaginatedPostsResponse>(
    "/api/posts",
    {
      params: {
        page: pageParam,
        size: 10,
        category: "LIGHT_STORY",
      },
    }
  );

  return response.data;
};

export const createPost = async (newPostData: NewPostPayload): Promise<any> => {
  try {
    const response = await axiosInstace.post("/api/posts", newPostData);
    return response.data;
  } catch (error) {
    console.error("게시글 생성 API 에러:", error);
    throw error;
  }
};

export const patchPost = async ({
  postId,
  patchPostData,
}: {
  postId: number;
  patchPostData: PatchPost;
}): Promise<{}> => {
  try {
    const response = await axiosInstace.patch(
      `api/posts/${postId}`,
      patchPostData
    );
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

export const deletePost = async (postId: number) => {
  try {
    const response = await axiosInstace.delete(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};

export const fetchPostById = async (
  postId: number
): Promise<PostDetailResponse> => {
  try {
    const response = await axiosInstace.get<PostDetailResponse>(
      `/api/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
