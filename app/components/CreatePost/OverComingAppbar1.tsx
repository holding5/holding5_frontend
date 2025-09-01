import { View, Image, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
export default function OverComingAppbar1() {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View
      className="bg-white px-5 pb-3 justify-between items-center z-10 flex-row"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Image
        source={require("../../assets/logo.jpg")}
        className="w-[130px] h-[40px]"
        style={{ resizeMode: "contain" }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#EBF5FF", // 1. 부드러운 하늘색 배경
          paddingVertical: 6, // 2. 상하 여백
          paddingHorizontal: 14, // 3. 좌우 여백
          marginTop: 4,
          borderRadius: 20, // 4. 둥근 모서리 (알약 모양)

          // 5. 그림자 효과 (입체감)
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3, // Android용 그림자
        }}
        onPress={() => {
          navigate.navigate("OverComingRelated");
        }}
      >
        <Text
          className="text-center font-gmarketMedium text-lg text-[#4c4c4c]"
          style={{ fontWeight: "700", fontSize: 16 }}
        >
          관련 사연 보기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
