import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigation } from "@react-navigation/native"; // 👈 추가!
import { mockComments } from "../Wall/utils/data";

export default function PostDetail({ route }: any) {
  const { post } = route.params;
  const navigation = useNavigation(); // 👈 추가!
  const comments = mockComments; // 댓글 데이터 (mock data)

  const timeAgo = formatDistanceToNow(new Date(post.createAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0} // <<< 추가!
    >
      {/* 상단 제목 + 뒤로가기 */}
      <View className="flex-row bg-white items-center px-2 p-2 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 bg-[#85D0E3] rounded-md justify-center items-center"
        >
          <Feather name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>

        <Text className="font-gmarketMedium text-lg font-bold text-[#4c4c4c] ml-4">
          어려움 우리 함께 해결해요.
        </Text>
      </View>

      {/* 본문 + 댓글 리스트 */}
      <FlatList
        className="flex-1 px-2 bg-[#d4f6ff]"
        data={comments}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled" // <<< 요거 추가
        contentContainerStyle={{ paddingBottom: 100 }} // <<< 요것도 추가 (input 창 공간 확보)
        ListHeaderComponent={
          <View className="mt-2 mb-6 ">
            {/* 게시글 카드 */}
            <View className="p-4 bg-white rounded-2xl shadow-sm">
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: post.profile_img }}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View>
                  <Text className="font-bold text-base">{post.userName}</Text>
                  <Text className="text-gray-400 text-xs">{timeAgo}</Text>
                </View>
              </View>

              <Text className="text-gray-800 mb-4">{post.content}</Text>

              {/* 좋아요, 댓글, 신고 */}
              <View className="flex-row justify-around border-t border-gray-100 pt-3">
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="thumbs-up" size={18} color="#9ca3af" />
                  <Text className="text-gray-500 ml-1 text-sm">
                    {post.likes ?? 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="message-circle" size={18} color="#9ca3af" />
                  <Text className="text-gray-500 ml-1 text-sm">
                    {comments.length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="alert-circle" size={18} color="#9ca3af" />
                  <Text className="text-gray-500 ml-1 text-sm">
                    {post.reports ?? 0}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 댓글 안내 텍스트 */}
            <Text className="text-gray-600 text-sm mt-6 mb-2">댓글</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-row mb-5">
            {/* 댓글 프로필 */}
            <Image
              source={{
                uri: item.profile_img || "https://via.placeholder.com/150",
              }}
              className="w-10 h-10 rounded-full mr-3"
            />
            {/* 댓글 내용 */}
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="font-bold text-sm">{item.userName}</Text>
                <Text className="text-gray-400 text-xs ml-2">{item.time}</Text>
              </View>
              <Text className="text-gray-800 text-sm">{item.content}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* 댓글 입력창 고정 */}
      <View className="flex-row bg-white items-center px-4 py-3 mb-3 border-t border-gray-200">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
          placeholder="댓글을 남겨주세요"
          // value={comment}
          // onChangeText={setComment}
        />
        <TouchableOpacity
          // onPress={handleSendComment}
          className="ml-2 bg-[#85D0E3] rounded-full px-4 py-2"
        >
          <Text className="text-white text-sm font-bold">입력</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
