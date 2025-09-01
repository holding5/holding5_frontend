import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CatsEyeAppbar from "./CatsEyeAppbar";
import { useState } from "react";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CheckSquare, Square } from "lucide-react-native";
import { Alert } from "react-native";

export default function CatsEyeWrite() {
  const [select, setSelect] = useState({
    local: false,
    school: false,
    police: false,
  });

  const handleSelect = (key: "local" | "school" | "police") => {
    setSelect((prev) => {
      if (key === "local") {
        const nextLocal = !prev.local;
        return { local: nextLocal, school: false, police: false };
      } else {
        const next = { ...prev, [key]: !prev[key] };
        next.local = false;
        return next;
      }
    });
  };
  const handleNext = () => {
    const { local, school, police } = select;

    if (!local && !school && !police) {
      Alert.alert("선택 필요", "하나 이상 선택해 주세요.");
      return;
    }

    if (local) {
      navigation.navigate("LocalWrite");
      return;
    }

    if (school) {
      navigation.navigate("SchoolWrite");
    }

    if (police) {
      navigation.navigate("PoliceWrite");
      return;
    }
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <CatsEyeAppbar />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.card}>
          <Text style={styles.mainTitle}>잘 오셨습니다^^</Text>

          <Text style={styles.title}>캣츠아이를 작성하면</Text>
          <Text style={styles.p}>
            “내 편이 되어 주는 친구가 단 한 명이라도 있었으면 절망적이지 않았을
            겁니다.” 수많은 피해친구들이 절규했습니다 주변 친구들이 침묵하고
            외면하는 것이 피해 친구를 더 힘들게 합니다. 용기내서 감사합니다.
          </Text>

          <Text style={styles.p}>1. 위기의 친구를 구할 수 있습니다.</Text>

          <Text style={styles.p}>2. 가해 친구의 범죄를 멈출 수 있습니다.</Text>

          <Text style={styles.p}>3. 우리 힘으로 해결할 수 있습니다.</Text>

          <View style={styles.select}>
            <Text style={styles.selectText}>다음 중 선택하세요</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleSelect("local")}
            disabled={select.school || select.police}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              marginBottom: 5,
              height: 28,
              opacity: select.local ? 0.4 : 1,
            }}
          >
            {select.local ? (
              <CheckSquare size={20} color="#f57c00" />
            ) : (
              <Square size={20} color="#f57c00" />
            )}
            <Text
              style={{
                fontSize: 16,
                marginLeft: 6,
                fontWeight: "700",
                marginBottom: 3,
                color: "#1a8dffff",
              }}
            >
              지역사회에 공유하기
            </Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "700", marginLeft: 26, marginBottom: 20 }}>
            GPS기반 해당지역사회에 공유됩니다.
          </Text>

          <TouchableOpacity
            onPress={() => handleSelect("school")}
            disabled={select.local}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              marginBottom: 5,
              height: 28,
              opacity: select.school ? 0.4 : 1,
            }}
          >
            {select.school ? (
              <CheckSquare size={20} color="#f57c00" />
            ) : (
              <Square size={20} color="#f57c00" />
            )}
            <Text
              style={{
                fontSize: 16,
                marginLeft: 6,
                fontWeight: "700",
                marginBottom: 3,
                color: "#1a8dffff",
              }}
            >
              학교에 제보하기
            </Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={{ fontWeight: "700", marginBottom: 20 }}>
              해당 학교에서 공식 가입이 되어 있는 경우는 학교 선생님께 바로
              제보됩니다.
            </Text>
            <TouchableOpacity style={styles.search}>
              <Text style={styles.searchText}>검색</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleSelect("police")}
            disabled={select.local}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              marginBottom: 5,
              height: 28,
              opacity: select.police ? 0.4 : 1,
            }}
          >
            {select.police ? (
              <CheckSquare size={20} color="#f57c00" />
            ) : (
              <Square size={20} color="#f57c00" />
            )}
            <Text
              style={{
                fontSize: 16,
                marginLeft: 6,
                fontWeight: "700",
                marginBottom: 3,
                color: "#1a8dffff",
              }}
            >
              경찰에 공유하기
            </Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={{ fontWeight: "700", marginBottom: 20 }}>
              공식가입이 되어 있는 경찰서가 있는 경우는 학원폭력 담당 형사에게
              제보됩니다.
            </Text>
            <TouchableOpacity style={styles.search}>
              <Text style={styles.searchText}>검색</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: "skyblue" }}>
            * 선택 중 학교나 경찰은 하나 혹은 둘 모두 선택이 가능합니다.
          </Text>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: 100,
              backgroundColor: "rgb(30, 58, 105)",
              marginBottom: 40,
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: " rgba(12, 30, 62, 1)",
            }}
            onPress={handleNext}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  scrollBody: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
  },
  title: { marginTop: 12, fontSize: 16, fontWeight: "700", color: "#d32f2f" },
  p: { marginTop: 8, fontSize: 14, lineHeight: 20, color: "#111827" },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#02d1ffff",
  },
  select: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  selectText: { fontSize: 16, color: "white", fontWeight: "bold" },
  searchContainer: { paddingLeft: 26, marginBottom: 20 },
  search: {
    backgroundColor: "rgb(30, 58, 105)",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: " rgba(12, 30, 62, 1)",
  },
  searchText: { color: "white", fontWeight: "700" },
});
