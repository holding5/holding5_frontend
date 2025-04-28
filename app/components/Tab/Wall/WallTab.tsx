import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { WallItem } from "./WallItem/WallItem";
import CategoryFilter from "./CategoryFilter";
import { data } from "./utils/data";

export const WallTab = () => (
  <SafeAreaView className="flex-1 justify-center items-center bg-[#d4f6ff]">
    <ScrollView className="p-2 bg-[#d4f6ff]">
      <CategoryFilter />
      {data.map((post, index) => (
        <WallItem key={index} post={post} />
      ))}
      <View className="h-5 bg-[#d4f6ff]" />
    </ScrollView>
  </SafeAreaView>
);
