import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/wall";
import { MyPostItem } from "./MyPost/MyPostItem";
import OverComingFilter from "./filter/OverComingFilter";
import { data } from "../Tab/Wall/utils/data";
import { useState, useCallback } from "react";
import { Pen, Pencil } from "lucide-react-native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CreatePostAppbar } from "./CreatePostAppbar";
import { usePost } from "../../context/PostContext";
import OverComingWrite from "./OverComingWrite";
import { Alert } from "react-native";

const overComingOptions = [
  {
    key: "holdingFive",
    text: "홀딩파이브에서 극복한 경우",
    subOptions: [
      { key: "findStory", text: "극복 전 올린 내 사연 찾기" },
      { key: "noStory", text: "극복 전 올린 내 사연 없음" },
    ],
  },
  { key: "external", text: "홀딩파이브와 관계없이 극복한 경우" },
];

export default function OverComing() {
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const textInputRef = useRef<TextInput>(null);
  const {
    form,
    handleFilterChange,
    handleSubmit,
    resetForm,
    handleSelectPost,
  } = usePost();
  const handlePencil = () => {
    if (form.subSelection === null) {
      Alert.alert("경고", "항목을 선택해주세요.", [{ text: "확인" }]);
    } else {
      navigation.navigate("OverComingWrite");
    }
  };
  const posts = data;
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  // });

  // if (isLoading) {
  //   return <ActivityIndicator size="large" className="flex-1" />;
  // }

  // if (isError) {
  //   console.log("API 호출 에러:", error);

  //   return <Text>데이터를 불러오는 중 오류가 발생했습니다.</Text>;
  // }

  // const posts = data?.content || [];

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log(posts);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <CreatePostAppbar onSubmit={handleSubmit} />
        <View className="p-4 bg-[#d4f6ff]">
          <OverComingFilter
            options={overComingOptions}
            mainSelection={form.mainSelection}
            subSelection={form.subSelection}
            setMainSelection={(key) => handleFilterChange("mainSelection", key)}
            setSubSelection={(key) => handleFilterChange("subSelection", key)}
          />
        </View>
        <View className="flex-1">
          <KeyboardAwareScrollView
            className="bg-[#d4f6ff]"
            ref={scrollViewRef}
            enableOnAndroid
            keyboardOpeningTime={0}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-start",
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="p-4">
              {form.subSelection === "findStory" &&
                posts.map((post) => {
                  const isSelected = form.selectedPosts.includes(post.id);
                  return (
                    <MyPostItem
                      key={post.id}
                      post={post}
                      isSelected={isSelected}
                      onSelect={() => {
                        handleSelectPost(post.id);
                      }}
                    />
                  );
                })}
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity
            onPress={handlePencil}
            className="absolute bottom-8 self-center bg-blue-500 p-4 rounded-full shadow-lg"
          >
            <Pencil size={28} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
