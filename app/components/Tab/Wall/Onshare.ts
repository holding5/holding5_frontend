import { Share } from "react-native";

export const onShare = async () => {
  // 딥링크 URL 생성 (myapp://profile/123)
  //   const url = Linking.createURL(`profile/${userId}`);
  try {
    await Share.share({
      message: `내 프로필 구경해봐!`,
    });
  } catch (error) {
    console.error("공유 실패:", error);
  }
};
