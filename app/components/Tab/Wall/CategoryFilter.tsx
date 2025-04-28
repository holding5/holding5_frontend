import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import {
  ChevronDown,
  ChevronUp,
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

const CategoryFilter = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { width } = useWindowDimensions();

  const maxWidth = width * 0.95;

  const toggleSelectAll = () => {
    if (selected.length === categories.length) {
      setSelected([]); // 모두 해제
    } else {
      setSelected([...categories]); // 전체 선택
    }
  };

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <View
      className="bg-white p-2 mb-2 rounded-2xl shadow-lg"
      style={{ width: maxWidth }}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="flex-row justify-between items-center bg-gray-100 p-3 rounded-xl"
      >
        <Text className="text-gray-800 font-semibold font-gmarketMedium">
          카테고리 선택
        </Text>
        {expanded ? (
          <ChevronUp size={20} color="gray" />
        ) : (
          <ChevronDown size={20} color="gray" />
        )}
      </TouchableOpacity>

      {/* 아코디언 펼쳐질 영역 */}
      {expanded && (
        <ScrollView className="max-h-80 mt-2">
          {/* 전체 선택 버튼 */}
          <TouchableOpacity
            onPress={toggleSelectAll}
            className="flex-row items-center px-2 pt-2"
          >
            {selected.length === categories.length ? (
              <CheckCircle size={22} color="#F893B1" />
            ) : (
              <Circle size={22} color="gray" />
            )}
            <Text className="ml-3 text-gray-800 font-gmarketMedium">
              전체 선택
            </Text>
          </TouchableOpacity>

          {/* 개별 카테고리 체크박스 (가로 2개씩 배치) */}
          <View className="flex-row flex-wrap p-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory(category)}
                className="w-1/2 flex-row items-center py-1.5"
              >
                {selected.includes(category) ? (
                  <CheckCircle size={22} color="#f472b6" />
                ) : (
                  <Circle size={22} color="gray" />
                )}
                <Text className="ml-3 text-gray-800 font-gmarketMedium">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 적용 버튼 */}
          <TouchableOpacity className="bg-[#F893B1] py-3 rounded-xl mt-1 font-gmarketMedium">
            <Text className="text-white text-center font-gmarketMedium">
              적용
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default CategoryFilter;
