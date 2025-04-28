import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { mockComments } from "../Tab/Wall/utils/data";
import { PostData } from "../Tab/Wall/utils/WallType";
import { PostDeatilAppbar } from "./PostDetailAppbar";
import { WallCard } from "../Tab/Wall/WallItem/WallCard";
import { CommentsList } from "./CommentsList";

interface PostDetailProps {
  route: {
    params: { post: PostData };
  };
}

export default function PostDetail({ route }: PostDetailProps) {
  const { post } = route.params;
  const comments = mockComments;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      {/* 상단 제목 + 뒤로가기 */}
      <PostDeatilAppbar />

      {/* 본문 + 댓글 리스트 */}
      <ScrollView
        className="bg-[#d4f6ff]"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <View className="px-2 mt-2">
          <WallCard post={post} collapsed={false} />
          {/* 댓글 리스트 */}
          <CommentsList comments={comments} />
        </View>
      </ScrollView>

      {/* 댓글 입력창 고정 */}
      <View className="flex-row bg-white items-center mb-2 px-4 py-3 border-t border-gray-200 justify-center">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
          placeholder="댓글을 남겨주세요"
        />
        <TouchableOpacity className="ml-2 bg-[#85D0E3] rounded-full px-4 py-2">
          <Text className="font-gmarketMedium text-white text-sm">입력</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
