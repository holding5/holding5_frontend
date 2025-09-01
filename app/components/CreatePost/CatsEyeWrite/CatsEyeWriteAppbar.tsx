import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckSquare, Square } from "lucide-react-native";
import { useState } from "react";

export default function CatsEyeWriteAppbar() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-row bg-white items-center justify-between p-2 border-b border-gray-200">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 bg-[#85D0E3] rounded-md justify-center items-center"
      >
        <Feather name="arrow-left" size={20} color="#ffffff" />
      </TouchableOpacity>

      <View className="flex-row items-center space-x-2">
        <TouchableOpacity onPress={() => navigation.navigate("CatsEyeUsage")}>
          <FontAwesome name="question" size={30} color="#16dbfdff" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/logo_image.png")}
          className="w-14 h-14"
          resizeMode="contain"
        />
        <Text className="font-gmarketMedium text-lg text-[#4c4c4c]">
          캣츠아이
        </Text>
      </View>

      <TouchableOpacity>
        <Image
          source={require("../../../assets/logo_image.png")}
          className="w-14 h-14"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
