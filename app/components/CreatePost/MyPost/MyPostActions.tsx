import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PostData } from "../../Tab/Wall/utils/WallType";
interface PostActionsProps {
  post: PostData;
}

export const MyPostActions = ({ post }: PostActionsProps) => (
  <View className="flex-row items-center space-x-2">
    <View className="flex-row items-center">
      <Feather name="heart" size={18} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-sm">
        응원해요 <Text className="w-10 text-center">{post. cheerCount}</Text>
      </Text>
    </View>

    <View className="flex-row items-center">
      <Feather name="message-circle" size={18} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-sm">
        댓글 <Text className="w-10 text-center">{post.commentsCount}</Text>
      </Text>
    </View>
    <View className="flex-row items-center">
      <Feather name="alert-triangle" size={18} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-sm">
        신고 <Text className="w-10 text-center">{post.reportCount}</Text>
      </Text>
    </View>
  </View>
);
