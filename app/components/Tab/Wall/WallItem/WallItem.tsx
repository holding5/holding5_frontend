import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PostCard } from "./PostCard";
import { PostData } from "../utils/WallType";
import { PostActions } from "./PostActions";
import { PostMenu } from "./PostMenu";

interface WallItemProps {
  post: PostData;
}

export function WallItem({ post }: WallItemProps) {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const maxWidth = width * 0.95;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("PostDetail", { post })}
    >
      <View
        className="bg-white p-4 rounded-lg shadow-lg mb-2 overflow-hidden"
        style={{ width: maxWidth }}
      >
        <PostCard post={post} />

        <View className="flex-row justify-between  border-t border-gray-200 pt-3"></View>

        <View className="flex-row justify-between">
          <PostMenu />
          <PostActions post={post} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
