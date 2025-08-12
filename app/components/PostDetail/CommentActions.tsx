import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CommentData } from "../Tab/Wall/utils/WallType";

interface CommentActionsProps {
  comment: CommentData;
}

export const CommentActions = ({ comment }: CommentActionsProps) => (
  <View className="flex-row items-center space-x-2">
    <View className="flex-row items-center">
      <Feather name="thumbs-up" size={15} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-xs">
        좋아요 <Text className="w-10 text-center">{comment.likes}</Text>
      </Text>
    </View>
    <View className="flex-row items-center">
      <Feather name="alert-triangle" size={15} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-xs">
        신고 <Text className="w-10 text-center">{comment.reports}</Text>
      </Text>
    </View>
  </View>
);
