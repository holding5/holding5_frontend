import { Image, Text, View } from "react-native";
import { ko } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

export function PostCard({ post }: any) {
  const timeAgo = formatDistanceToNow(new Date(post.createAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <View className="flex-row mb-2">
      <Image
        source={{ uri: post.profile_img }}
        className="w-12 h-12 rounded-lg mr-3 shadow-md"
      />
      <View className="flex-1 flex-col overflow-hidden">
        <View className="flex-row justify-between items-start mb-1 ">
          <View className="flex-row items-center">
            <Text className="font-koPubWoldBold text-lg font-semibold ">
              {post.userName}
            </Text>
            <Text className="font-koPubWoldMediumtext-md text-gray-400 ml-1.5">
              {post.problem}
            </Text>
          </View>
          <Text className="font-gmarketMedium text-xs text-gray-400 flex-shrink-0 ml-2">
            {timeAgo}
          </Text>
        </View>

        <Text className="font-koPubWoldMedium text-sm text-gray-700 mb-1 flex-wrap max-w-full">
          {post.content}
        </Text>
      </View>
    </View>
  );
}
