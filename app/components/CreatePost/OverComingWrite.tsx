import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OverComingAppbar2 from "./OverComingAppbar2";
import OverComingAppbar1 from "./OverComingAppbar1";
import { usePost } from "../../context/PostContext";
import { CheckCircle, Circle, CheckSquare, Square } from "lucide-react-native";

const overComingOptions = [
  {
    key: "holdingFive",
    text: "홀딩파이브에서 극복한 경우",
    subOptions: [
      { key: "findStory", text: "극복 전 올린 내 사연 찾기" },
      { key: "noStory", text: "극복 전 올린 내 사연 없음" },
    ],
  },
  { key: "external", text: "홀딩파이브와 관계없이 극복한 경우" },
];

const helpOptions = [
  { key: "lifeMessage", text: "생명메시지" },
  { key: "comfortReply", text: "위로댓글" },
  { key: "catsEye", text: "캣츠아이" },
  { key: "hopeMessage", text: "희망메시지" },
  { key: "othersStory", text: "타인의 사연" },
  { key: "counseling", text: "상담" },
  { key: "michael", text: "미카엘" },
  { key: "dormitory", text: "몇단배" },
  { key: "etc", text: "기타" },
];

export default function OverComingWrite() {
  const {
    form,
    handleToggleHelpOption,
    handleSubmit,
    setAnonymous,
    handleFilterChange,
  } = usePost();
  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <OverComingAppbar1 />
      <OverComingAppbar2 text={"홀딩파이브 극복수기"} />
      <KeyboardAwareScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16 }}
      >
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          {overComingOptions.map((category) => (
            <View key={category.key}>
              <View className="flex-row items-center">
                {category.key === form.mainSelection ? (
                  <CheckCircle size={22} color={"black"} />
                ) : (
                  <Circle size={22} color={"black"} />
                )}
                <Text className="ml-3 text-gray-800 font-gmarketMedium">
                  {category.text}
                </Text>
              </View>
              {form.mainSelection === category.key && category.subOptions && (
                <View className="ml-8 mt-2  ">
                  {category.subOptions.map((subOption) => (
                    <View className="flex-row mb-4 items-center">
                      {form.subSelection === subOption.key ? (
                        <CheckCircle size={22} color={"black"} />
                      ) : (
                        <Circle size={22} color={"black"} />
                      )}
                      <Text className="ml-3 text-gray-800 font-gmarketMedium">
                        {subOption.text}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <Text className=" text-gray-800 font-gmarketMedium mt-5">
            어려움을 극복하시는데 홀딩파이브의 어느 기능에서 가장 도움을 많이
            받으셨나요?
          </Text>
          <View className="flex-row flex-wrap">
            {helpOptions.map((option) => {
              const isSelected = form.helpOptions.includes(option.key);

              return (
                <View key={option.key} className="w-1/2 p-1">
                  <TouchableOpacity
                    onPress={() => handleToggleHelpOption(option.key)}
                    className="flex-row items-center rounded-lg p-2"
                    style={{
                      backgroundColor: isSelected ? "#D1FAE5" : "white",
                    }}
                  >
                    {isSelected ? (
                      <CheckSquare size={22} color="#10B981" />
                    ) : (
                      <Square size={22} color="gray" />
                    )}
                    <Text className="ml-2 text-gray-800 font-gmarketMedium">
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View className="bg-white rounded-xl p-1 mt-3 shadow-sm mb-4 border border-gray-200">
            <TextInput
              className="text-base font-gmarketMedium"
              style={{ minHeight: 150, textAlignVertical: "top" }}
              placeholder="극복한 사연을 써 주세요"
              multiline
              value={form.content}
              onChangeText={(text) => handleFilterChange("content", text)}
            />
          </View>

          <View className="flex-row items-center justify-between mt-4 mb-5">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setAnonymous(!form.isAnonymous)}
            >
              {form.isAnonymous ? (
                <CheckCircle size={24} color="#3B82F6" />
              ) : (
                <Circle size={24} color="gray" />
              )}
              <Text className="ml-2 text-lg text-gray-700 font-gmarketMedium">
                익명
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 rounded-lg py-3 px-8"
            >
              <Text className="text-white text-lg font-gmarketMedium">
                등록하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "lightblue", padding: 16 },
});
