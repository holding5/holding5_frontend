import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { PatchPost } from "../../api/type/apiType";
import { patchPost } from "../../api/wall";
export const usePatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPost,
    onSuccess: (data, variables) => {
      console.log("게시글 수정 성공");
      const { postId } = variables;
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
