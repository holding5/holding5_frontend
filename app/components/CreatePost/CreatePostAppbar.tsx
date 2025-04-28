import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function CreatePostAppbar() {
  const navigation = useNavigation();

  return (
    <View className="flex-row bg-white items-center px-2 p-2 border-b border-gray-200">
      {/* 화살표 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 bg-[#85D0E3] rounded-md justify-center items-center"
      >
        <Feather name="arrow-left" size={20} color="#ffffff" />
      </TouchableOpacity>

      {/* 텍스트 중앙 정렬 */}
      <Text className="flex-1 text-center font-gmarketMedium text-lg font-bold text-[#4c4c4c]">
        글쓰기
      </Text>

      {/* 완료 버튼 */}
      <TouchableOpacity
        onPress={() => console.log("완료 버튼 클릭")}
        className="w-12 h-9 justify-center items-center rounded-md border-[#85D0E3]"
        style={{
          borderWidth: 2,
        }}
      >
        <Text className="text-[#85D0E3] font-bold">완료</Text>
      </TouchableOpacity>
    </View>
  );
}
