import { useQuery } from "@tanstack/react-query"; //
import { fetchPostById } from "../../api/wall";

export const useGetPostByIdQuery = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],

    queryFn: () => fetchPostById(postId),

    enabled: !!postId,
  });
};
