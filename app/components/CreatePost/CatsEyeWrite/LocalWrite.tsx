import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Circle, CheckSquare, Square } from "lucide-react-native";
import PinInput from "../../common/PinInput";
import CatsEyeWriteAppbar from "./CatsEyeWriteAppbar";
import { useState } from "react";
export default function LocalWrite() {
  const [content, setContent] = useState("");
  const [understand, setUnderstand] = useState({
    content: false,
    usage: false,
  });
  return (
    <View style={styles.container}>
      <CatsEyeWriteAppbar />
      <View style={styles.categoryContainer}>
        <View style={{ flexDirection: "row" }}>
          <Circle size={20} color={"#e1e1e1ff"} />
          <Text
            style={{
              color: "skyblue",
              fontSize: 14,
              fontWeight: "700",
              marginLeft: 4,
            }}
          >
            지역사회에 공유
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Circle size={20} color={"#e1e1e1ff"} />
          <Text
            style={{
              color: "#f57c00",
              fontSize: 14,
              fontWeight: "700",
              marginLeft: 4,
            }}
          >
            구미시 지역
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollBody}>
        <View style={styles.card}>
          <Text style={{ marginBottom: 5 }}>
            용기내어 줘서 정말 감사해요.^^ 우리의 목적은 가해자를 직접
            처벌하자는 것이 아닙니다. 우리가 정당성이 있다고 하더라도 공개적으로
            공격하는 것 또한 폭력일 수 있기 때문입니다. 다음 사항을 읽고 동의해
            주세요.
          </Text>

          <Text>1. 본 제보는 이중 익명처리를 통해 제보자를 보호합니다.</Text>
          <Text>
            2. 캣츠아이는 피해사실을 중심으로 기록한 정보이며 가해자의 행동은
            물론 피해자가 입는 피해 역시 결코 옳지 않다는 것을 드러내어 사회적
            관심을 가지게 하는 공익목적입니다.
          </Text>
          <Text>
            3. 따라서 제보과정에서 또 다른 폭력이 될 수 있는 가해자나 피해자를
            알 수 있는 이름(실명)이나 유추할 수 있는 정보는 절대 포함되어서는
            안됩니다.
          </Text>
          <Text>
            4. 개인신상정보공개 및 허위 사실을 작성하는 경우 명예훼손이나
            관련법률에 따라 법률적 책임을 질 수 있습니다.
          </Text>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 280,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 28,
                  marginBottom: 6,
                }}
              >
                {understand.content ? (
                  <CheckSquare size={20} color="#f57c00" />
                ) : (
                  <Square size={20} color="#f57c00" />
                )}
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginLeft: 8 }}
                >
                  위의 내용을 읽고 이해했습니다.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 28,
                }}
              >
                {understand.usage ? (
                  <CheckSquare size={20} color="#f57c00" />
                ) : (
                  <Square size={20} color="#f57c00" />
                )}
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginLeft: 8 }}
                >
                  캣츠아이 사용법을 이해했습니다.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          비밀번호 숫자 4자리를 설정해 주세요
        </Text>
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <PinInput
            length={4}
            secure
            onComplete={(code) => alert(`비밀번호: ${code}`)}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>내용을 작성해 주세요</Text>
          <TouchableOpacity
            style={styles.exampleBtn}
            onPress={() =>
              setContent(
                "지난 2025년 4월 17일 오후 4시경 OO중학교 O학년 O반에서 피해자가 3명으로부터 구타를 당했습니다. 이는 같은 피해자에게 여러 차례 반복적으로 일어나고 있는 현상입니다."
              )
            }
          >
            <Text style={styles.exampleBtnText}>작성예시 보기</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.contentInput}
          placeholder="사건이 언제, 어디서, 어떻게 일어났는지 구체적으로 적어 주세요."
          placeholderTextColor="#9CA3AF"
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => console.log("등록", content)}
        >
          <Text style={styles.submitText}>등록</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const BLUE = "#DDEFF7";
const BLUE_BORDER = "#A7D0E4";
const DEEP_BLUE = "#103A66";
const RED = "#E53935";

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginLeft: 18,
  },
  container: { flex: 1, backgroundColor: "#fff" },
  scrollBody: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: "lightblue",
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  exampleBtn: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  exampleBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  contentInput: {
    marginTop: 6,
    minHeight: 140,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#111827",
  },

  submitBtn: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 100,
    backgroundColor: "rgb(30, 58, 105)",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(12, 30, 62, 1)",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
