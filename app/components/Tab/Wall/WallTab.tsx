import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { data } from "./utils/data";
import { WallItem } from "./WallItem/WallItem";
import CategoryFilter from "./CategoryFilter";
import { RootStackParamList } from "../../../App";
import { useGetPostsQuery } from "../../hooks/useGetPostsMutation";
export const WallTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useGetPostsQuery();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#d4f6ff]">
        <ActivityIndicator size="large" color="#85D0E3" />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View className="flex-1 justify-center items-center bg-[#d4f6ff]">
        <Text>데이터를 불러오는 데 실패했습니다.</Text>
      </View>
    );
  }

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <View className="flex-1 justify-center items-center bg-[#d4f6ff]">
      <TouchableOpacity></TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({ item }) => <WallItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<CategoryFilter />}
        className="w-full"
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }}
      />

      <TouchableOpacity
        onPress={handleCreatePost}
        className="absolute bottom-8 right-5 bg-[#85D0E3] p-5 rounded-full"
      >
        <Feather name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};
