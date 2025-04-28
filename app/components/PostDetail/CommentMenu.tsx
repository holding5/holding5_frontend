import React from "react";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

export function CommentMenu() {
  const handlePress = () => {
    // 삭제 팝업 띄우기
    Alert.alert("댓글을 삭제하시겠습니까?", "", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          // 삭제 작업
          console.log("삭제 클릭");
        },
        style: "destructive",
      },
    ]);
    // Alert.alert("권한이 없습니다", "댓글을 삭제할 수 없습니다.");
  };

  return (
    <Feather
      style={{ marginRight: 12 }}
      name="more-horizontal"
      size={18}
      color="#9ca3af"
      onPress={handlePress} // 아이콘 클릭 시 handlePress 실행
    />
  );
}
