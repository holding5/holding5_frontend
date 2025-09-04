// src/hooks/useGetPostsQuery.ts

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchPosts } from "../../api/wall";
import { getPostLike, deletePostLike, postPostLike } from "../../api/wall";
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
      // 좋아요 수가 변경되었으므로, 관련된 쿼리들을 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: ["postLike", variables.postId],
      });

      // 1. 해당 게시물의 상세 정보 쿼리 무효화 (좋아요 수 업데이트)
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });

      // 2. 전체 게시물 목록 쿼리 무효화 (목록에서도 좋아요 수 업데이트)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("게시물 좋아요 취소 실패:", error);
    },
  });
};

/**
 * 게시물에 좋아요를 누르는 뮤테이션 훅
 */
export const usePostPostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPostLike,
    onSuccess: (data, variables) => {
      console.log("게시물 좋아요 성공");
      // 좋아요 취소와 동일하게, 관련된 모든 쿼리를 무효화합니다.
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
