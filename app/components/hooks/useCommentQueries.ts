// src/hooks/useCommentQueries.ts

import { useQuery } from "@tanstack/react-query";
import { getCommentLike, getCommentReport } from "../../api/wall";
/**
 * 특정 댓글의 좋아요 개수를 가져오는 훅
 */
export const useGetCommentLikeQuery = (commentId: number) => {
  return useQuery({
    queryKey: ["commentLike", commentId],
    queryFn: () => getCommentLike(commentId),
    enabled: !!commentId, // commentId가 있을 때만 실행
  });
};

/**
 * 특정 댓글의 신고 개수를 가져오는 훅
 */
export const useGetCommentReportQuery = (commentId: number) => {
  return useQuery({
    queryKey: ["commentReport", commentId],
    queryFn: () => getCommentReport(commentId),
    enabled: !!commentId,
  });
};
