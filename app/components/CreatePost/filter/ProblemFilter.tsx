import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";

// --- 1. Props 타입 정의 ---

// 옵션 항목 하나의 타입을 정의합니다.
type Option = {
  key: string;
  value: string;
};

// ProblemFilter가 받을 props 전체의 타입을 정의합니다.
type ProblemFilterProps = {
  options: Option[];
  selectedValue: string | null;
  onSelect: (key: string) => void;
};

// --- 2. 컴포넌트 수정 ---

const ProblemFilter = ({
  options,
  selectedValue,
  onSelect,
}: ProblemFilterProps) => {
  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      <View className="bg-[#F9C47E] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          어떤 문제가 있나요?
        </Text>
      </View>

      <View className="flex-row flex-wrap p-2 px-4">
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => onSelect(option.key)}
            className="w-1/2 flex-row items-center py-1.5"
          >
            {selectedValue === option.key ? (
              <CheckCircle size={22} color="#F9C47E" />
            ) : (
              <Circle size={22} color="gray" />
            )}
            <Text className="ml-3 text-gray-800 font-gmarketMedium">
              {option.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProblemFilter;
