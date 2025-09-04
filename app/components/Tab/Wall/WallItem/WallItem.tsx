import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WallCard } from "./WallCard";
import { Post } from "../../../../api/type/apiType";
interface WallItemProps {
  post: Post;
  // post: PostData;
}

export function WallItem({ post }: WallItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("PostDetail", { post })}
    >
      <WallCard post={post} collapsed={true} />
    </TouchableOpacity>
  );
}
