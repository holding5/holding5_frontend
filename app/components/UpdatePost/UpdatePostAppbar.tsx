import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onSubmit: () => void;
}

export default function UpdatePostAppbar({ onSubmit }: Props) {
  const navigation = useNavigation();

  return (
    <View className="flex-row bg-white items-center px-2 p-2 border-b border-gray-200">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 bg-[#85D0E3] rounded-md justify-center items-center"
      >
        <Feather name="arrow-left" size={20} color="#ffffff" />
      </TouchableOpacity>
      <Text className="flex-1 text-center font-gmarketMedium text-lg text-[#4c4c4c]">
        수정하기
      </Text>

      <TouchableOpacity
        onPress={onSubmit}
        className="w-12 h-9 justify-center items-center rounded-md border-[#85D0E3]"
        style={{
          borderWidth: 2,
        }}
      >
        <Text className="text-[#85D0E3] font-gmarketMedium">완료</Text>
      </TouchableOpacity>
    </View>
  );
}
