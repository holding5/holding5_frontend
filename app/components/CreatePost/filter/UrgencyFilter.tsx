import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";

const situationIntensy = [
  "괜찮아요",
  "약간 심각해요",
  "심각해요",
  "많이 심각해요",
  "최고로 심각해요",
];

const mindStatus = [
  "상관없음",
  "약간 불안해요",
  "불안해요",
  "많이 불안해요",
  "죽을만큼 불안해요",
];

const UrgencyFilter = () => {
  const [selected1, setSelected1] = useState<string>("");
  const [selected2, setSelected2] = useState<string>("");

  const toggleCategory1 = (category: string) => {
    // 선택된 항목을 새 항목으로 변경
    setSelected1(category);
  };
  const toggleCategory2 = (category: string) => {
    // 선택된 항목을 새 항목으로 변경
    setSelected2(category);
  };

  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      {/* 상단 제목 */}
      <View className="bg-[#96B6DC] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          얼마나 심각한가요?
        </Text>
      </View>

      {/* 두 컴포넌트 좌우 배치 */}
      <View className="flex-row">
        {/* 상황의 심각성 */}
        <View className="flex-1 px-2">
          <Text className="mt-4 ml-3 text-gray-800 font-gmarketMedium text-center text-bold">
            상황의 심각성
          </Text>
          <View className="border-t border-gray-300 mt-3" />

          <View className="flex-col w-full p-2">
            {situationIntensy.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory1(category)}
                className="flex-row items-center py-1.5"
              >
                {selected1 === category ? (
                  <CheckCircle size={22} color="#96B6DC" />
                ) : (
                  <Circle size={22} color="gray" />
                )}
                <Text className="ml-3 text-gray-800 font-gmarketMedium">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 마음의 상태 */}
        <View className="flex-1 px-2">
          <Text className="mt-4 ml-3 text-gray-800 font-gmarketMedium text-center text-bold">
            마음의 상태
          </Text>
          <View className="border-t border-gray-300 mt-3" />
          <View className="flex-col w-full p-2">
            {mindStatus.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory2(category)}
                className="flex-row items-center py-1.5"
              >
                {selected2 === category ? (
                  <CheckCircle size={22} color="#96B6DC" />
                ) : (
                  <Circle size={22} color="gray" />
                )}
                <Text className="ml-3 text-gray-800 font-gmarketMedium">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UrgencyFilter;
