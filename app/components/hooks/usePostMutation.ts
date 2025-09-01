import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { createPost } from "../../api/wall";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Alert.alert("성공", "게시글이 성공적으로 등록되었습니다.");
      navigation.goBack();
    },
    onError: (error) => {
      console.error("게시글 작성 실패:", error);
      Alert.alert("오류", "게시글 등록에 실패했습니다.");
    },
  });
};
