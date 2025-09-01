import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { PostData } from "../../Tab/Wall/utils/WallType";
import { MyHistoryCard } from "./MyHistoryCard";
import { CheckCircle } from "lucide-react-native";

interface WallItemProps {
  post: PostData;
  isSelected: boolean;
  onSelect: () => void;
}

export function MyPostItem({ post, isSelected, onSelect }: WallItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      className="relative"
    >
      <MyHistoryCard post={post} collapsed={true} />
      {isSelected && (
        <View className="absolute inset-0 rounded-lg items-center justify-center bg-black/40">
          <CheckCircle size={52} color="#4ade80" />
        </View>
      )}
    </TouchableOpacity>
  );
}
