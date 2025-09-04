// src/hooks/useCommentMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postCommentLike,
  deleteCommentLike,
  postCommentReport,
  deleteCommentReport,
  postComment,
  updateComment,
  deleteComment,
} from "../../api/wall";
import { Variable } from "lucide-react-native";
import { Alert } from "react-native";

/**
 * 댓글에 좋아요를 누르는 뮤테이션 훅
 */
export const usePostCommentLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCommentLike,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["commentLike", variables.commentId],
      });
    },
  });
};

/**
 * 댓글 좋아요를 취소하는 뮤테이션 훅
 */
export const useDeleteCommentLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentLike,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["commentLike", variables.commentId],
      });
    },
  });
};

/**
 * 댓글을 신고하는 뮤테이션 훅
 */
export const usePostCommentReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCommentReport,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["commentReport", variables.commentId],
      });
      alert("신고가 접수되었습니다.");
    },
  });
};

/**
 * 댓글 신고를 취소하는 뮤테이션 훅
 */
export const useDeleteCommentReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentReport,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["commentReport", variables.commentId],
      });
    },
  });
};

export const postCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data, variables) => {
      const queryKey = ["comments", variables.postId];
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      Alert.alert("성공", "댓글이 성공적으로 등록되었습니다.");
    },

    onError: (error) => {
      console.error("댓글 생성 실패:", error);
      Alert.alert("오류", "댓글 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

export const deleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      Alert.alert("성공", "댓글이 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      Alert.alert("오류", "댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

export const updateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      Alert.alert("성공", "댓글이 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      Alert.alert("오류", "댓글 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
