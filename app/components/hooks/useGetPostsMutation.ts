// src/hooks/useGetPostsQuery.ts

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchPosts } from "../../api/wall";
import {
  getPostLike,
  deletePostLike,
  postPostLike,
  postPostReport,
  deletePostReport,
} from "../../api/wall";
import { Alert } from "react-native";

export const useGetPostsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.last ? undefined : allPages.length;
    },
  });
};

export const useGetPostLikeQuery = (postId: number) => {
  return useQuery({
    queryKey: ["postLike", postId],
    queryFn: () => getPostLike(postId),
    enabled: !!postId,
  });
};

export const useDeletePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostLike,
    onSuccess: (data, variables) => {
      console.log("게시물 좋아요 취소 성공");
      queryClient.invalidateQueries({
        queryKey: ["postLike", variables.postId],
      });

      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("게시물 좋아요 취소 실패:", error);
    },
  });
};

export const usePostPostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPostLike,
    onSuccess: (data, variables) => {
      console.log("게시물 좋아요 성공");
      queryClient.invalidateQueries({
        queryKey: ["postLike", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("게시물 좋아요 실패:", error);
    },
  });
};

export const usePostReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPostReport,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Alert.alert("성공", "게시물이 신고되었습니다.");
    },
    onError: (error) => {
      const message = "신고에 실패했습니다.";
      Alert.alert("오류", message);
    },
  });
};

export const useDeleteReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostReport,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Alert.alert("성공", "신고가 취소되었습니다.");
    },
    onError: (error) => {
      const message = "신고 취소에 실패했습니다.";
      Alert.alert("오류", message);
    },
  });
};
