import { Image, Text, TouchableOpacity, View } from "react-native";
import { onShare } from "../Onshare";
import { Feather } from "@expo/vector-icons";

export function PostMenu() {
  return (
    <View className="flex-row items-center">
      <Feather
        style={{ marginRight: 12 }}
        name="more-horizontal"
        size={18}
        color="#9ca3af"
      />

      <TouchableOpacity onPress={onShare} style={{ marginRight: 15 }}>
        <Feather name="share-2" size={18} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
}
