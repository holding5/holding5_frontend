import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function PostDeatilAppbar() {
  const navigation = useNavigation();

  return (
    <View className="flex-row bg-white items-center px-2 p-2 border-b border-gray-200">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 bg-[#85D0E3] rounded-md justify-center items-center"
      >
        <Feather name="arrow-left" size={20} color="#ffffff" />
      </TouchableOpacity>

      <Text className="font-gmarketMedium text-lg text-[#4c4c4c] ml-4">
        어려움 우리 함께 해결해요.
      </Text>
    </View>
  );
}
