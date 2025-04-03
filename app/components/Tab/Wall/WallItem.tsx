import { formatDistanceToNow } from "date-fns";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { ko } from "date-fns/locale"; // 한국어 로케일을 임포트
import Icon from "react-native-vector-icons/FontAwesome";

export function WallItem({ post }: any) {
  const { width } = useWindowDimensions();
  const maxWidth = width * 0.9;
  const timeAgo = formatDistanceToNow(new Date(post.createAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <View
      className="bg-white p-4 rounded-lg shadow-lg mb-3 overflow-hidden"
      style={{ width: maxWidth }}
    >
      <View className="flex-row mb-3">
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

      <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>

      <View className="flex-row justify-between">
        {/* 좌측: 더보기, 공유하기 버튼 */}
        <View className="flex-row items-center">
          <Icon
            style={{ marginRight: 15 }}
            name="ellipsis-h"
            size={18}
            color="#9ca3af"
          />
          <Icon name="share-alt" size={18} color="#9ca3af" />
        </View>

        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center">
            <Icon name="heart" size={18} color="#ef4444" />
            <Text className="font-gmarketMedium text-gray-500 ml-1">
              응원해요{" "}
              <Text className="w-10 text-center">{post.cheerCount}</Text>
            </Text>
          </View>

          <View className="flex-row items-center">
            <Icon name="comment" size={18} color="#9ca3af" />
            <Text className="font-gmarketMedium text-gray-500 ml-1">
              댓글{" "}
              <Text className="w-10 text-center">{post.commentsCount}</Text>
            </Text>
          </View>

          <View className="flex-row items-center">
            <Icon name="bullhorn" size={18} color="#9ca3af" />
            <Text className="font-gmarketMedium text-gray-500 ml-1">
              신고 <Text className="w-10 text-center">{post.reportCount}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
