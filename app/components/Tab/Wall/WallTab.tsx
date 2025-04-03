import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { WallItem } from "./WallItem";
import CategoryFilter from "./CategoryFilter";
import { data } from "./data";

export const WallTab = () => (
  <SafeAreaView className="flex-1 justify-center items-center bg-blue-100">
    <ScrollView className="p-4">
      <CategoryFilter />
      {data.map((post, index) => (
        <WallItem key={index} post={post} />
      ))}
      <View className="h-5 bg-blue-100" />
    </ScrollView>
  </SafeAreaView>
);
