import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyHistoryCard } from "./MyPost/MyHistoryCard";
import { PostData } from "../Tab/Wall/utils/WallType";
import { RootStackParamList } from "../../App";
interface WallItemProps {
  post: PostData;
}

export function SelectedPost({ post }: WallItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity activeOpacity={0.8} className="relative">
      <MyHistoryCard post={post} collapsed={true} />
    </TouchableOpacity>
  );
}
