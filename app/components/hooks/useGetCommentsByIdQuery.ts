// src/hooks/useGetCommentsByIdQuery.ts (가칭)

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsById } from "../../api/wall"; // API 함수

export const useGetCommentsByIdQuery = (
  postId: number,
  sort: string = "latest"
) => {
  const queryKey = ["comments", postId, sort];
  return useInfiniteQuery({
    queryKey: queryKey,

    queryFn: ({ pageParam }) =>
      getCommentsById({
        postId: postId,
        pageParam: pageParam,
        sort: sort,
      }),

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.last ? undefined : allPages.length;
    },
    enabled: !!postId,
  });
};
