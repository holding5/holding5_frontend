import { CommentData } from "../Tab/Wall/utils/WallType";
import { maxWidth } from "../common/maxWidth";
import { View } from "react-native";
import { CommentItem } from "./CommentItem";
import { useState } from "react";
import { CommentsSort } from "./CommentSort";

interface CommentsListProps {
  comments: CommentData[];
}

export function CommentsList({ comments }: CommentsListProps) {
  // const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <View
      className="bg-white px-4 py-3 rounded-lg shadow-lg mb-2 overflow-hidden"
      style={{ width: maxWidth() }}
    >
      {/* 상단 선택지 */}
      <CommentsSort />
      {/* 댓글 리스트 */}
      {comments.map((comment, index) => (
        <View key={index}>
          <View
            style={{
              height: 1,
              backgroundColor: "#e0e0e0",
            }}
          />
          <CommentItem comment={comment} />
        </View>
      ))}
    </View>
  );
}
