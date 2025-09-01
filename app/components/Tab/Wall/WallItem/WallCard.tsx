import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import { PostCard } from "./PostCard";
import { PostActions } from "./PostActions";
import { PostMenu } from "./PostMenu";
import { maxWidth } from "../../../common/maxWidth";
import { Post } from "../../../../api/type/apiType";
import { PostData } from "../utils/WallType";
interface WallItemProps {
  post: Post;
  // post: PostData;
  collapsed: boolean;
}

export function WallCard({ post, collapsed }: WallItemProps) {
  return (
    <View
      className="bg-white p-4 rounded-lg shadow-lg mb-2 overflow-hidden"
      style={{ width: maxWidth() }}
    >
      <PostCard post={post} collapsed={collapsed} />

      <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>

      <View className="flex-row justify-between">
        <PostMenu id={post.id} />
        <PostActions post={post} />
      </View>
    </View>
  );
}
