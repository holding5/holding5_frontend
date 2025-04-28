import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  CheckCircle,
  Circle,
} from "lucide-react-native";

const categories = [
  "가벼운 이야기",
  "왕따, 학교폭력",
  "성적, 학업문제",
  "친구, 이성문제",
  "부모님과 갈등",
  "선생님과 갈등",
  "가정형편, 경제",
  "외모문제",
  "기타문제",
  "극복수기",
];

const ProblemFilter = () => {
  const [selected, setSelected] = useState<string>("");

  const toggleCategory = (category: string) => {
    setSelected(category);
  };

  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      <View className="bg-[#F9C47E] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          어떤 문제가 있나요?
        </Text>
      </View>

      <View className="flex-row flex-wrap p-2 px-4">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => toggleCategory(category)}
            className="w-1/2 flex-row items-center py-1.5"
          >
            {selected.includes(category) ? (
              <CheckCircle size={22} color="#F9C47E" />
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
  );
};

export default ProblemFilter;
