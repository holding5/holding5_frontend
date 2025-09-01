import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { PatchPost } from "../../api/type/apiType";
import { deletePost } from "../../api/wall";
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data, variables) => {
      console.log("게시글 삭제 성공");
      const postId = variables;
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
