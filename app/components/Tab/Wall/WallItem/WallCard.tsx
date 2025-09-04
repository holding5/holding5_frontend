import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import { PostCard } from "./PostCard";
import { PostActions } from "./PostActions";
import { PostMenu } from "./PostMenu";
import { maxWidth } from "../../../common/maxWidth";
import { Post } from "../../../../api/type/apiType";
import {
  usePostPostLikeMutation,
  useDeletePostLikeMutation,
} from "../../../hooks/useGetPostsMutation";
import { useAuth } from "../../../../context/LoginContext";
import { Alert } from "react-native";
import { useState } from "react";
interface WallItemProps {
  post: Post;
  // post: PostData;
  collapsed: boolean;
}

export function WallCard({ post, collapsed }: WallItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { userId } = useAuth();
  const { mutate: likePost } = usePostPostLikeMutation();
  const { mutate: deleteLike } = useDeletePostLikeMutation();
  const togglePostLike = () => {
    console.log(`좋아요 토글: postId=${post.id}, userId=${userId}`);

    if (!userId) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    if (isLiked) {
      deleteLike({ postId: post.id, userId });
    } else {
      likePost({ postId: post.id, userId });
    }
    setIsLiked(!isLiked);
  };

  return (
    <View
      className="bg-white p-4 rounded-lg shadow-lg mb-2 overflow-hidden"
      style={{ width: maxWidth() }}
    >
      <PostCard post={post} collapsed={collapsed} />

      <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>

      <View className="flex-row justify-between">
        <PostMenu id={post.id} />
        <PostActions post={post} togglePostLike={togglePostLike} />
      </View>
    </View>
  );
}
