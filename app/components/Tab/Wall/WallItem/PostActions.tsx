import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Post } from "../../../../api/type/apiType";
interface PostActionsProps {
  post: Post;
  isLiked: boolean;
  isReported: boolean;
  togglePostLike: () => void;
  onReportPress: () => void;
}

export const PostActions = ({ post,
  isLiked,
  isReported,
  togglePostLike,
  onReportPress, }: PostActionsProps) => (
  <View className="flex-row items-center space-x-2">
    <TouchableOpacity
      className="flex-row items-center"
      onPress={togglePostLike}
    >
      <Feather name="heart" size={18} color={isLiked ? "#F472B6" : "#9ca3af"} />
      <Text className={`font-gmarketMedium ml-1 text-sm ${
          isLiked ? "text-pink-400" : "text-gray-500"
        }`}>
        응원해요 <Text className="w-10 text-center">{post.likeCount}</Text>
      </Text>
    </TouchableOpacity>

    <View className="flex-row items-center">
      <Feather name="message-circle" size={18} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-sm">
        댓글 <Text className="w-10 text-center">{post.commentCount}</Text>
      </Text>
    </View>
    <TouchableOpacity className="flex-row items-center" onPress={() => {}}>
      <Feather name="alert-triangle" size={18} color={isReported ? "#EF4444" : "#9ca3af"} />
      <Text  className={`font-gmarketMedium ml-1 text-sm ${
          isReported ? "text-red-500" : "text-gray-500"
        }`}>
        신고 <Text className="w-10 text-center">{post.reportCount}</Text>
      </Text>
    </TouchableOpacity>
  </View>
);
