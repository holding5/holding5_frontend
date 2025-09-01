import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Circle, CheckSquare, Square } from "lucide-react-native";
import PinInput from "../../common/PinInput";
import CatsEyeWriteAppbar from "./CatsEyeWriteAppbar";

export default function PoliceWrite() {
  const [agree, setAgree] = useState({ content: false, usage: false });
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));

  const setAnswer = (idx: number, text: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = text;
      return next;
    });
  };

  const handleSubmit = () => {
    console.log("등록 payload:", { agree, answers });
  };

  const Q = [
    {
      title: "언제 어디서 있었던 일이죠?",
      placeholder: "언제 어디에서 있었던 일인지 구체적으로 써 주세요",
    },
    {
      title: "가해자는 누구이며 피해자는 누구입니까?",
      placeholder: "가해자와 피해자 모두 실명을 사용하셔도 됩니다.",
    },
    {
      title: "어떻게 괴롭혔다는 것이죠?",
      placeholder: "어떻게 괴롭혔는지 상세하게 적어 주세요.",
    },
    {
      title: "혹시 왜 괴롭히고 있는지 이유는 아세요?",
      placeholder: "괴롭히는 이유를 적어 주세요",
    },
    {
      title: "경찰관에게 전하고 싶은 개인적인 생각이나 의견은?",
      placeholder:
        "경찰관님께 전하고 싶은 개인적인 생각이나 의견을 적어 주세요",
    },
  ];

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
            117경찰청에 공유
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
            구미 경찰서
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.leadTitle}>용기내어 줘서 정말 감사해요.^^</Text>
          <Text style={styles.leadP}>
            당신의 용기가 이 순간 위기에 빠진 본인 또는 친구를 구할 수 있습니다.
            아래 제보 전 동의서를 잘 읽고 작성해 주세요.
          </Text>
          <View style={styles.redPill}>
            <Text style={styles.redPillText}>제보 전 동의서</Text>
          </View>
          <View style={{ gap: 6 }}>
            <Text style={styles.li}>
              1. 본 제보는 2중 익명처리 단계를 거치므로 제보자는 공개되지
              않습니다.
            </Text>
            <Text style={styles.li}>
              2. 제보내용은 자신이 본 것을 중심으로 사실적으로 써야 하며
              확실하지 않은 내용을 추리해서 적으면 안 됩니다.
            </Text>
            <Text style={styles.li}>
              3. 본 제보는 담당경찰관만 보기 때문에 가해자 피해자 모두의 실명을
              적을 수 있습니다.
            </Text>
            <Text style={styles.li}>
              4. 거짓정보·허위사실 제보 시 관련법률에 따라 책임을 질 수
              있습니다.
            </Text>
          </View>
          \{" "}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={{ width: 300, alignItems: "flex-start" }}>
              <TouchableOpacity
                onPress={() => setAgree((s) => ({ ...s, content: !s.content }))}
                style={styles.checkRow}
              >
                {agree.content ? (
                  <CheckSquare size={20} color="#f57c00" />
                ) : (
                  <Square size={20} color="#f57c00" />
                )}
                <Text style={styles.checkText}>
                  위의 내용을 읽고 이해했습니다.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAgree((s) => ({ ...s, usage: !s.usage }))}
                style={styles.checkRow}
              >
                {agree.usage ? (
                  <CheckSquare size={20} color="#f57c00" />
                ) : (
                  <Square size={20} color="#f57c00" />
                )}
                <Text style={styles.checkText}>
                  캣츠아이 사용법을 읽고 이해했습니다.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>
          비밀번호 숫자 4자리를 설정해 주세요.
        </Text>
        <View style={{ alignSelf: "center", marginTop: 12 }}>
          <PinInput length={4} secure={false} onComplete={() => {}} />
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          제보할 내용을 입력해 주세요
        </Text>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>가급적 아래의 질문에</Text>
          <Text style={styles.tipTitle}>
            직접 본 것이거나 알고 있는 사실을 기록해 주세요.
          </Text>
          <Text style={styles.tipDot}>.</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          {Q.map((q, i) => (
            <View key={i} style={{ marginBottom: 14 }}>
              <Text style={styles.qTitle}>{q.title}</Text>
              <TextInput
                style={styles.qInput}
                placeholder={q.placeholder}
                placeholderTextColor="#9CA3AF"
                multiline
                value={answers[i]}
                onChangeText={(t) => setAnswer(i, t)}
                textAlignVertical="top"
              />
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
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
  container: { flex: 1, backgroundColor: "#fff" },
  scrollBody: { padding: 16 },

  card: {
    backgroundColor: BLUE,
    borderColor: BLUE_BORDER,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },

  leadTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  leadP: { fontSize: 14, lineHeight: 22, color: "#111827", marginBottom: 10 },

  redPill: {
    alignSelf: "flex-start",
    backgroundColor: RED,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 10,
  },
  redPillText: { color: "#fff", fontWeight: "800" },

  li: { fontSize: 14, lineHeight: 22, color: "#111827" },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 28,
    marginTop: 8,
  },
  checkText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  qTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  qInput: {
    minHeight: 90,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#111827",
  },

  submitBtn: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 100,
    backgroundColor: "rgb(30, 58, 105)",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(12, 30, 62, 1)",
  },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  tipCard: {
    marginTop: 8,
    backgroundColor: BLUE,
    borderColor: BLUE_BORDER,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  tipTitle: { fontSize: 16, fontWeight: "800", color: "#0f172a" },
  tipDot: { fontSize: 28, lineHeight: 28, color: "#0f172a" },
  categoryContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginLeft: 18,
  },
});
