import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { PatchPost } from "../../api/type/apiType";
import { patchPost } from "../../api/wall";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
export const usePatchMutation = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPost,
    onSuccess: (data, variables) => {
      console.log("게시글 수정 성공");
      const { postId } = variables;
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Alert.alert("게시글 수정", "게시글 수정이 완료 되었습니다.", [
        {
          text: "확인",
          onPress: () => {},
        },
      ]);
    },
  });
};
