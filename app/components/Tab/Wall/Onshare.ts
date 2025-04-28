import { Share } from "react-native";

export const onShare = async (id: string) => {
  const url = `myapp://profile/${id}`;
  
  try {
    await Share.share({
      message: `홀딩파이브 공유하기! ${url}`,
    });
  } catch (error) {
    console.error("공유 실패:", error);
  }
};
