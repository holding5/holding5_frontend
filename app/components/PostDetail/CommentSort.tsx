import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const CommentsSort = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <View className="">
      {/* 상단 선택지 */}
      <View className="flex-row mb-2 justify-center">
        {/* 최근에 등록된 댓글 보기 */}
        <TouchableOpacity
          onPress={() => setSortOrder("newest")}
          className={`flex-row items-center justify-center p-2 mr-2 ${
            sortOrder === "newest" ? "border-[#85D0E3]" : "border-gray-300"
          }`}
          style={{
            width: "50%", // 화면 너비의 50% 차지
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor:
              sortOrder === "newest" ? "#transparent" : "transparent",
          }}
        >
          <View
            className={`w-5 h-5 rounded-full ${
              sortOrder === "newest" ? "bg-[#85D0E3]" : "bg-gray-300"
            }`}
          />
          <Text className="font-gmarketMedium text-gray-500 ml-2 text-xs">
            최근에 등록된 댓글 보기
          </Text>
        </TouchableOpacity>

        {/* 댓글 순서대로 보기 */}
        <TouchableOpacity
          onPress={() => setSortOrder("oldest")}
          className={`flex-row items-center justify-center p-2 ${
            sortOrder === "oldest" ? "border-[#85D0E3]" : "border-gray-300"
          }`}
          style={{
            width: "43%", // 화면 너비의 50% 차지
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor:
              sortOrder === "oldest" ? "#transparent" : "transparent",
          }}
        >
          <View
            className={`w-5 h-5 rounded-full ${
              sortOrder === "oldest" ? "bg-[#85D0E3]" : "bg-gray-300"
            }`}
          />
          <Text className="font-gmarketMedium text-gray-500 ml-2 text-xs">
            댓글 순서대로 보기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
