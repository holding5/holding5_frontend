import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { mockComments } from "../Tab/Wall/utils/data";
import { PostData } from "../Tab/Wall/utils/WallType";
import { PostDeatilAppbar } from "./PostDetailAppbar";
import { WallCard } from "../Tab/Wall/WallItem/WallCard";
import { CommentsList } from "./CommentsList";
import { Post } from "../../api/type/apiType";
import { useGetCommentsByIdQuery } from "../hooks/useGetCommentsByIdQuery";
import { useGetPostByIdQuery } from "../hooks/useGetDetailPostMutation";
import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { CommentsSort } from "./CommentSort";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/LoginContext";
import { postCommentMutation } from "../hooks/useCommentMutation";
import { maxWidth } from "../common/maxWidth";

interface PostDetailProps {
  route: {
    params: { post: Post };
  };
}

export default function PostDetail({ route }: PostDetailProps) {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [isAnoy, setAnoy] = useState(false);
  const [comment, setComment] = useState("");

  const { userId } = useAuth();
  const { mutate: submitComment, isPending } = postCommentMutation();

  const handleSort = () => {
    setSort((prev) => (prev === "latest" ? "oldest" : "latest"));
  };
  const { post: summaryPost } = route.params;
  const postId = summaryPost.id;

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isLoading: areCommentsLoading,
    isFetchingNextPage,
    error: commentsError,
  } = useGetCommentsByIdQuery(postId, sort);

  const handleCommentSubmit = () => {
    if (!userId) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }
    if (!comment.trim() || isPending) return;

    submitComment({ postId, userId, content: comment, anonymity: isAnoy });
    setComment("");
  };
  const allComments = commentsData?.pages.flatMap((page) => page.content) ?? [];

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      {/* 상단 제목 + 뒤로가기 */}
      <PostDeatilAppbar />
      {/* 본문 + 댓글 리스트 */}
      <FlatList
        data={allComments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        contentContainerStyle={{ backgroundColor: "#d4f6ff" }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <View style={{ paddingHorizontal: 8, marginTop: 8 }}>
              <WallCard post={summaryPost} collapsed={false} />
              <CommentsSort currentSort={sort} onSortChange={handleSort} />
            </View>
          </>
        }
        ItemSeparatorComponent={() => (
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: maxWidth() - 32,
                height: 1,
                backgroundColor: "#e0e0e0",
              }}
            />
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ margin: 20 }} />
          ) : null
        }
      />
      {/* 댓글 입력창 고정 */}
      <View className="flex-row items-center bg-white p-3 border-t border-gray-200">
        <TextInput
          className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-base mr-3"
          placeholder="댓글을 남겨주세요"
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          onPress={() => setAnoy(!isAnoy)}
          className="flex-row items-center mr-3"
        >
          <Text
            className={`text-sm mr-1 ${
              isAnoy ? "text-[#85D0E3]" : "text-gray-400"
            }`}
          >
            익명
          </Text>
          <MaterialIcons
            name={isAnoy ? "radio-button-checked" : "radio-button-unchecked"}
            size={24}
            color={isAnoy ? "#85D0E3" : "#9ca3af"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCommentSubmit}
          disabled={isPending || !comment.trim()}
          className={`w-16 h-11 justify-center items-center rounded-2xl ${
            comment.trim() ? "bg-[#85D0E3]" : "bg-gray-300"
          }`}
        >
          {isPending ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="font-gmarketMedium text-white text-base">
              입력
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
