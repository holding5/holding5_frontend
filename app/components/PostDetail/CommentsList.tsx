import { CommentData } from "../Tab/Wall/utils/WallType";
import { maxWidth } from "../common/maxWidth";
import { View } from "react-native";
import { CommentItem } from "./CommentItem";
import { useState } from "react";
import { CommentsSort } from "./CommentSort";
import { Comment } from "../../api/type/apiType";

interface CommentsListProps {
  comments: Comment[];
  sort: string;
  handleSort: () => void;
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <View
      className="bg-white px-4 py-3 rounded-lg shadow-lg mb-2 overflow-hidden"
      style={{ width: maxWidth() }}
    >
      {/* 상단 선택지 */}
      {/* <CommentsSort /> */}
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
