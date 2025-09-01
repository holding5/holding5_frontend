import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  text: string;
}

export default function OverComingAppbar2({ text }: Props) {
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
      <Text className="flex-1 text-center font-gmarketMedium text-lg text-[#4c4c4c]">
        {text}
      </Text>
      <Text></Text>
    </View>
  );
}
