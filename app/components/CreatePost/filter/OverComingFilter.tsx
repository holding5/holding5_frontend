import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle, CheckSquare, Square } from "lucide-react-native";

// 1. props로 받을 데이터의 타입을 명확하게 정의합니다.
type Option = {
  key: string;
  text: string;
  subOptions?: { key: string; text: string }[];
};

type OverComingFilterProps = {
  options: Option[]; // 데이터를 외부에서 받습니다.
  mainSelection: string | null;
  subSelection: string | null;
  setMainSelection: (key: string | null) => void;
  setSubSelection: (key: string | null) => void;
};

const OverComingFilter = ({
  options,
  mainSelection,
  subSelection,
  setMainSelection,
  setSubSelection,
}: OverComingFilterProps) => {
  console.log("OverComingFilter가 받은 options:", options);

  const handleMainSelect = (categoryKey: string) => {
    if (mainSelection === categoryKey) {
      setMainSelection(null);
      setSubSelection(null);
    } else {
      setMainSelection(categoryKey);
      setSubSelection(null);
    }
  };

  const handleSubSelect = (subCategoryKey: string) => {
    setSubSelection(subCategoryKey);
  };

  return (
    <View className="bg-white rounded-2xl shadow-lg w-full">
      <View className="bg-[#F9C47E] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          선택해 주세요
        </Text>
      </View>
      <View className="p-4">
        {options.map((category) => (
          <View key={category.key}>
            <TouchableOpacity
              onPress={() => handleMainSelect(category.key)}
              className="flex-row w-full items-center py-1.5"
            >
              {mainSelection === category.key ? (
                <CheckCircle size={22} color="#F9C47E" />
              ) : (
                <Circle size={22} color="gray" />
              )}
              <Text className="ml-3 text-gray-800 font-gmarketMedium">
                {category.text}
              </Text>
            </TouchableOpacity>

            {mainSelection === category.key && category.subOptions && (
              <View className="ml-8 mt-2">
                {category.subOptions.map((subOption) => (
                  <TouchableOpacity
                    key={subOption.key}
                    onPress={() => handleSubSelect(subOption.key)}
                    className="flex-row items-center py-1.5"
                  >
                    {subSelection === subOption.key ? (
                      <CheckSquare size={22} color="#85D0E3" />
                    ) : (
                      <Square size={22} color="gray" />
                    )}
                    <Text className="ml-3 text-gray-600 font-gmarketMedium">
                      {subOption.text}
                    </Text>
                  </TouchableOpacity>
                ))}
                {subSelection === null && (
                  <View className="bg-[#d4f6ff] p-3 rounded-md mt-2">
                    <Text className="text-[#4c4c4c] font-gmarketMedium">
                      극복 전 힘든 내 사연을 찾아주세요.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default OverComingFilter;
