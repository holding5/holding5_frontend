import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import { PostCard } from "./PostCard";
import { PostActions } from "./PostActions";
import { PostMenu } from "./PostMenu";
import { maxWidth } from "../../../common/maxWidth";
import { Post } from "../../../../api/type/apiType";
import {
  usePostPostLikeMutation,
  useDeletePostLikeMutation,
  usePostReportMutation,
  useDeleteReportMutation,
} from "../../../hooks/useGetPostsMutation";
import { useAuth } from "../../../../context/LoginContext";
import { Alert } from "react-native";
import { useState } from "react";
import { ReportModal } from "../../../PostDetail/ReportModal";

interface WallItemProps {
  post: Post;
  collapsed: boolean;
}

export function WallCard({ post, collapsed }: WallItemProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isReported, setIsReported] = useState(post.isReported);
  const [isReportModalVisible, setReportModalVisible] = useState(false);

  const { userId } = useAuth();
  const { mutate: likePost } = usePostPostLikeMutation();
  const { mutate: deleteLike } = useDeletePostLikeMutation();
  const { mutate: reportPost } = usePostReportMutation();
  const {mutate:deleteReport} = useDeleteReportMutation();


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

    const handleReportToggle = () => {
    if (!userId) return Alert.alert("로그인이 필요합니다.");

    if (isReported) {
      // 이미 신고한 상태라면 -> 신고 취소 로직
      Alert.alert("신고 취소", "이 게시물에 대한 신고를 취소하시겠습니까?", [
        { text: "유지", style: "cancel" },
        {
          text: "신고 취소",
          onPress: () => {
            deleteReport({ postId: post.id, userId });
            setIsReported(false); // UI 즉시 반영
          },
          style: "destructive",
        },
      ]);
    } else {
      // 신고하지 않은 상태라면 -> 신고 모달 열기
      setReportModalVisible(true);
    }
  };

  const handleSelectReportReason = (reason: { type: string }) => {
    setReportModalVisible(false);

    reportPost({
      postId: post.id,
      userId: userId!,
      type: reason.type,
    });
    setIsReported(true);
  };
  return (
    <View
      className="bg-white p-4 rounded-lg shadow-lg mb-2 overflow-hidden"
      style={{ width: maxWidth() }}
    >
      <PostCard post={post} collapsed={collapsed} />

      <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>
₩₩
      <View className="flex-row justify-between">
        <PostMenu id={post.id} />
        <PostActions
          post={post}
          togglePostLike={togglePostLike}
          isLiked={isLiked}
          isReported={isReported}
          onReportPress={handleReportToggle}
        />
        <ReportModal
          visible={isReportModalVisible}
          onClose={() => setReportModalVisible(false)}
          onSelectReason={handleSelectReportReason}
        />
      </View>
    </View>
  );
}
