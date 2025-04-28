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
  "상관없음",
  "기독교인",
  "천주교인",
  "불교인",
  "무교"
];

const ReligiousFilter = () => {
  const [selected, setSelected] = useState<string>("");

  const toggleCategory = (category: string) => {
    setSelected(category);
  };

  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      <View className="bg-[#F893B1] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          의지할 종교는 있나요?
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
              <CheckCircle size={22} color="#F893B1" />
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

export default ReligiousFilter;
