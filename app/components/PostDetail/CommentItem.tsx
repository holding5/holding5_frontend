import { CommentData } from "../Tab/Wall/utils/WallType";
import { Image, Text, View } from "react-native";
import { ko } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Feather } from "@expo/vector-icons";
import { CommentActions } from "./CommentActions";
import { CommentMenu } from "./CommentMenu";

interface CommentItemProps {
  comment: CommentData;
}

export function CommentItem({ comment }: CommentItemProps) {
  const timeAgo = formatDistanceToNow(new Date(comment.createAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <View className="my-3">
      <View className="flex-row">
        <Image
          source={{ uri: comment.profile_img }}
          className="w-8 h-8 rounded-lg mr-2 shadow-md"
        />
        <View className="flex-1 flex-col overflow-hidden">
          <View className="flex-row justify-between items-start ">
            <View className="flex-row items-center">
              <Text className="font-koPubWoldBold text-[16px] font-semibold ">
                {comment.userName}
              </Text>
            </View>
            <Text className="font-gmarketMedium text-xs text-gray-400 flex-shrink-0 ml-2">
              {timeAgo}
            </Text>
          </View>

          <Text
            className="font-koPubWoldMedium text-sm text-gray-700 mb-1 flex-wrap max-w-full"
            ellipsizeMode="tail"
          >
            {comment.content}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between">
        <CommentMenu />
        <CommentActions comment={comment} />
      </View>
    </View>
  );
}
