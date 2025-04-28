import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { WallItem } from "./WallItem/WallItem";
import CategoryFilter from "./CategoryFilter";
import { data } from "./utils/data";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // useNavigation 추가
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
export const WallTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <ScrollView className="p-2 bg-[#d4f6ff]">
        <CategoryFilter />
        {data.map((post, index) => (
          <WallItem key={index} post={post} />
        ))}
        <View className="h-5 bg-[#d4f6ff]" />
      </ScrollView>

      <TouchableOpacity
        onPress={handleCreatePost}
        className="absolute bottom-8 right-5 bg-[#85D0E3] p-5 rounded-full"
      >
        <Feather name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};
