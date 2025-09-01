import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";

type Option = {
  key: string;
  value: string;
};

type ReligiousFilterProps = {
  options: Option[];
  selectedValue: string | null;
  onSelect: (key: string) => void;
};

const ReligiousFilter = ({
  options,
  selectedValue,
  onSelect,
}: ReligiousFilterProps) => {
  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      <View className="bg-[#F893B1] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          의지할 종교는 있나요?
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
              <CheckCircle size={22} color="#F893B1" />
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

export default ReligiousFilter;
