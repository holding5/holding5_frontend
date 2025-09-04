import UpdatePostAppbar from "./UpdatePostAppbar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGetPostByIdQuery } from "../hooks/useGetDetailPostMutation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useState, useEffect } from "react";
import { usePatchMutation } from "../hooks/usePatchMutation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type UpdatePostProps = NativeStackScreenProps<RootStackParamList, "UpdatePost">;

export default function UpdatePost({ route }: UpdatePostProps) {
  const { postId } = route.params;
  const { data, isLoading, error } = useGetPostByIdQuery(postId);
  const { mutate: updatePost, isPending: isUpdating } = usePatchMutation();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [content, setContent] = useState("");
  const [mediaUrls, setMediaUrls] = useState("");

  useEffect(() => {
    if (data?.post) {
      setContent(data.post.content);
      setMediaUrls(data.post.mediaUrls);
    }
  }, [data]);

  const handleUpdate = () => {
    if (isUpdating) return;

    updatePost(
      {
        postId: postId,
        patchPostData: {
          content: content,
          mediaUrls: mediaUrls,
        },
      },
      {
        onSuccess: () => {
          navigate.reset({ routes: [{ name: "Tabs" }] });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <UpdatePostAppbar onSubmit={() => {}} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <UpdatePostAppbar onSubmit={() => {}} />
        <View style={styles.center}>
          <Text>데이터를 불러오는 데 실패했습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <UpdatePostAppbar onSubmit={handleUpdate} />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <TextInput
          style={styles.contentInput}
          placeholder="여기에 내용을 입력해주세요."
          multiline
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
          autoFocus // 화면 로드 시 자동으로 포커스 (선택 사항)
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollView: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 200,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});
