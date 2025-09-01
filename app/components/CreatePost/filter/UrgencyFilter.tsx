import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";

type Option = {
  key: string;
  value: string;
};

type UrgencyFilterProps = {
  situationOptions: Option[];
  mindOptions: Option[];
  selectedSituation: string | null;
  selectedMind: string | null;
  onSelectSituation: (key: string) => void;
  onSelectMind: (key: string) => void;
};

const UrgencyFilter = ({
  situationOptions,
  mindOptions,
  selectedSituation,
  selectedMind,
  onSelectSituation,
  onSelectMind,
}: UrgencyFilterProps) => {
  return (
    <View className="bg-white mb-2 rounded-2xl shadow-lg w-full">
      <View className="bg-[#96B6DC] p-2 px-4 rounded-t-xl">
        <Text className="text-white font-gmarketMedium text-base">
          얼마나 심각한가요?
        </Text>
      </View>

      <View className="flex-row">
        <View className="flex-1 px-2">
          <Text className="mt-4 ml-3 text-gray-800 font-gmarketMedium text-center text-bold">
            상황의 심각성
          </Text>
          <View className="border-t border-gray-300 mt-3" />
          <View className="flex-col w-full p-2">
            {situationOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => onSelectSituation(option.key)}
                className="flex-row items-center py-1.5"
              >
                {selectedSituation === option.key ? (
                  <CheckCircle size={22} color="#96B6DC" />
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

        <View className="flex-1 px-2">
          <Text className="mt-4 ml-3 text-gray-800 font-gmarketMedium text-center text-bold">
            마음의 상태
          </Text>
          <View className="border-t border-gray-300 mt-3" />
          <View className="flex-col w-full p-2">
            {mindOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => onSelectMind(option.key)}
                className="flex-row items-center py-1.5"
              >
                {selectedMind === option.key ? (
                  <CheckCircle size={22} color="#96B6DC" />
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
      </View>
    </View>
  );
};

export default UrgencyFilter;
