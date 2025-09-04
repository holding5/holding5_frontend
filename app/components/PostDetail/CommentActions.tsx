import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CommentData } from "../Tab/Wall/utils/WallType";

interface CommentActionsProps {
  likeCount: number;
  isLiked: boolean;
  onLikeToggle: () => void;
  isLoading: boolean;
  reportCount: number;
  onReport: () => void;
  isReportLoading: boolean;
}

export const CommentActions = ({
  likeCount,
  isLiked,
  onLikeToggle,
  isLoading,
  reportCount,
  onReport,
  isReportLoading,
}: CommentActionsProps) => (
  <View className="flex-row items-center space-x-2">
    <TouchableOpacity className="flex-row items-center" onPress={onLikeToggle}>
      <Feather
        name="thumbs-up"
        size={15}
        color={isLiked ? "#85D0E3" : "#9ca3af"}
      />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-xs">
        좋아요 <Text className="w-10 text-center">{likeCount}</Text>
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onReport} className="flex-row items-center">
      <Feather name="alert-triangle" size={15} color="#9ca3af" />
      <Text className="font-gmarketMedium text-gray-500 ml-1 text-xs">
        신고<Text className="w-10 text-center">{reportCount}</Text>
      </Text>
    </TouchableOpacity>
  </View>
);
