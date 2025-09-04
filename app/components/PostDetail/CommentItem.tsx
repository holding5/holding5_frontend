import { Image, Text, View } from "react-native";
import { ko } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Feather } from "@expo/vector-icons";
import { CommentActions } from "./CommentActions";
import { CommentMenu } from "./CommentMenu";
import { Comment } from "../../api/type/apiType";
import { useAuth } from "../../context/LoginContext";
import {
  usePostCommentLikeMutation,
  useDeleteCommentLikeMutation,
  usePostCommentReportMutation,
} from "../hooks/useCommentMutation";
import { maxWidth } from "../common/maxWidth";
import {
  useGetCommentLikeQuery,
  useGetCommentReportQuery,
} from "../hooks/useCommentQueries";
import { useState } from "react";
import { Alert } from "react-native";
import { ReportModal } from "./ReportModal"; // 1. 만든 모달 컴포넌트 import

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const [isReportModalVisible, setReportModalVisible] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const { userId } = useAuth();
  const { data: likeData, isLoading: isLikeLoading } = useGetCommentLikeQuery(
    comment.id
  );

  const { data: reportData, isLoading: isReportLoading } =
    useGetCommentReportQuery(comment.id);

  const { mutate: reportComment, isPending: isReporting } =
    usePostCommentReportMutation();

  const [isLiked, setIsLiked] = useState(false);

  const { mutate: likeComment } = usePostCommentLikeMutation();

  const { mutate: unlikeComment } = useDeleteCommentLikeMutation();

  const handleSelectReportReason = (reason: { type: string; text: string }) => {
    setReportModalVisible(false);

    if (!userId) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    // 확인 Alert을 띄운 후 신고 API 호출
    Alert.alert("신고 확인", `'${reason.text}' 사유로 신고하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "신고",
        onPress: () =>
          reportComment({
            commentId: comment.id,
            userId,
            type: reason.type,
            content: reason.text,
          }),
        style: "destructive",
      },
    ]);
  };

  const handleLikeToggle = () => {
    if (!userId) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    if (isLiked) {
      unlikeComment({ commentId: comment.id, userId });
    } else {
      likeComment({ commentId: comment.id, userId });
    }
    setIsLiked(!isLiked);
  };

  const handleReport = () => {
    if (!userId) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    const reportReason = {
      type: "SPAM",
      content: "스팸성 댓글입니다.",
    };

    Alert.alert("신고 확인", "이 댓글을 정말 신고하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "신고",
        onPress: () => {
          reportComment({
            commentId: comment.id,
            userId,
            type: reportReason.type,
            content: reportReason.content,
          });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View
      className="bg-white px-4"
      style={{ width: maxWidth(), alignSelf: "center" }}
    >
      <View className="my-3">
        <View className="flex-row">
          <Image
            // source={{ uri: comments.profile_img }}
            className="w-8 h-8 rounded-lg mr-2 shadow-md"
          />
          <View className="flex-1 flex-col overflow-hidden">
            <View className="flex-row justify-between items-start ">
              <View className="flex-row items-center">
                <Text className="font-koPubWoldBold text-[16px] font-semibold ">
                  {comment.authorName}
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
          <CommentActions
            likeCount={likeData}
            isLiked={isLiked}
            onLikeToggle={handleLikeToggle}
            isLoading={isLikeLoading}
            reportCount={reportData?.count ?? 0}
            isReportLoading={isReportLoading}
            onReport={() => setReportModalVisible(true)}
          />
          <ReportModal
            visible={isReportModalVisible}
            onClose={() => setReportModalVisible(false)}
            onSelectReason={handleSelectReportReason}
          />
        </View>
      </View>
    </View>
  );
}
