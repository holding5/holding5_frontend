import axiosInstace from "./axiosInstance";
import { PaginatedPostsResponse } from "./type/apiType";
import { QueryFunctionContext } from "@tanstack/react-query"; // 타입 import
import { NewPostPayload } from "./type/apiType";
import * as SecureStore from "expo-secure-store"; // SecureStore import
import { Alert } from "react-native";
import { PatchPost } from "./type/apiType";
import axios from "axios";
import { PostDetailResponse } from "./type/apiType";
import { Comment } from "./type/apiType";
import { PaginatedCommentsResponse } from "./type/apiType";
import {
  createComment,
  deleteCommentType,
  updateCommentType,
} from "./type/apiType";
export const fetchPosts = async (
  context: QueryFunctionContext
): Promise<PaginatedPostsResponse> => {
  const pageParam = context.pageParam || 0;

  try {
    const response = await axiosInstace.get<PaginatedPostsResponse>(
      "/api/posts/all",
      {
        params: {
          page: pageParam,
          size: 20,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export const getCommentsById = async ({
  postId,
  pageParam = 0,
  sort = "latest",
  size = 20,
}: {
  postId: number;
  pageParam: number;
  sort: string;
  size?: number;
}): Promise<PaginatedCommentsResponse> => {
  try {
    const response = await axiosInstace.get<PaginatedCommentsResponse>(
      `/posts/${postId}/comments`,
      {
        params: { page: pageParam, sort: sort, size: size },
      }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패", error);
    throw error;
  }
};

export const getCommentLike = async (commentId: number) => {
  try {
    const response = await axiosInstace.get(
      `/comments/${commentId}/like/count`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCommentLike = async ({
  commentId,
  userId,
}: {
  commentId: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstace.delete(`/comments/${commentId}/like`, {
      params: { commentId: commentId, userId: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postCommentLike = async ({
  commentId,
  userId,
}: {
  commentId: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstace.post(
      `/comments/${commentId}/like`,
      null,
      {
        params: { commentId: commentId, userId: userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentReport = async (commentId: number) => {
  try {
    const response = await axiosInstace.get(
      `/comments/${commentId}/report/count`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCommentReport = async ({
  commentId,
  userId,
}: {
  commentId: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstace.delete(
      `/comments/${commentId}/report`,
      { params: { userId: userId } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postCommentReport = async ({
  commentId,
  userId,
  type,
  content,
}: {
  commentId: number;
  userId: number;
  type: string;
  content: string;
}) => {
  try {
    const response = await axiosInstace.post(
      `/comments/${commentId}/report`,
      null,
      { params: { userId: userId, type: type, content: content } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postComment = async ({
  postId,
  userId,
  content,
  anonymity,
}: createComment) => {
  try {
    const response = await axiosInstace.post(
      `/posts/${postId}/comments`,
      {
        userId: userId,
        content: content,
        anonymity: anonymity,
      },
      {
        params: { postId: postId, anonymousUserKey: userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async ({
  postId,
  commentId,
}: deleteCommentType) => {
  try {
    const response = await axiosInstace.delete(
      `/posts/${postId}/comments/${commentId}`,
      { params: { postId: postId, commentId: commentId } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async ({
  postId,
  commentId,
  userId,
  content,
  anonymity,
}: updateCommentType) => {
  try {
    const response = await axiosInstace.put(
      `/posts/${postId}/comments/${commentId}`,
      {
        userId: userId,
        content: content,
        anonymity: anonymity,
      },
      { params: { postId: postId, commentId: commentId } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPostLike = async (postId: number) => {
  try {
    const response = await axiosInstace.get(`/posts/${postId}/like/count`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePostLike = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstace.delete(`/posts/${postId}/like`, {
      params: { userId: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postPostLike = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstace.post(`/posts/${postId}/like`, null, {
      params: { userId: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// export const postReportPost = async({

// })