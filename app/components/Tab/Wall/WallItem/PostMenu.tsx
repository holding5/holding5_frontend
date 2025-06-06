import React from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import { onShare } from "../Onshare";
import { Feather } from "@expo/vector-icons";

interface PostMenuProps {
  id: string;
}

export function PostMenu({ id }: PostMenuProps) {
  const showOptions = () => {
    Alert.alert(
      "옵션 선택",
      "삭제 또는 수정할 작업을 선택하세요.",
      [
        {
          text: "삭제하기",
          onPress: () => {
            // 삭제 작업
            console.log("삭제 클릭");
          },
          style: "destructive",
        },
        {
          text: "수정하기",
          onPress: () => {
            // 수정 작업
            console.log("수정 클릭");
          },
        },
        {
          text: "취소",
          onPress: () => {
            console.log("취소 클릭");
          },
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-row items-center">
      {/* 터치 영역 키우기 */}
      <TouchableOpacity onPress={showOptions} style={{ padding: 2 }}>
        <Feather
          style={{ marginRight: 12 }}
          name="more-horizontal"
          size={20}
          color="#9ca3af"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onShare(id)} style={{ padding: 2 }}>
        <Feather name="share-2" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
}
