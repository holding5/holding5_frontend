// src/hooks/useGetPostsQuery.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/wall";

export const useGetPostsQuery = () => {
  // useInfiniteQuery가 반환하는 모든 것을 그대로 반환(return)
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.last ? undefined : allPages.length;
    },
  });
};
