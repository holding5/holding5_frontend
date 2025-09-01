import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import { MyPostCard } from "./MyPostCard";
import { MyPostActions } from "./MyPostActions";
import { maxWidth } from "../../common/maxWidth";
import { PostData } from "../../Tab/Wall/utils/WallType";
import { CheckCircle } from "lucide-react-native";

interface WallItemProps {
  post: PostData;
  collapsed: boolean;
}

export function MyHistoryCard({ post, collapsed }: WallItemProps) {
  return (
    <View>
      <View
        className="bg-white p-4 rounded-lg shadow-lg mb-2 overflow-hidden"
        style={{ maxWidth: maxWidth() }}
      >
        <MyPostCard post={post} collapsed={collapsed} />

        <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>

        <View className="flex-row justify-flex-end">
          <MyPostActions post={post} />
        </View>
      </View>
    </View>
  );
}
