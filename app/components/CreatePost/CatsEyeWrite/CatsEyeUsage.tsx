import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CatsEyeUsageAppbar from "./CatsEyeUsageAppbar";
import { CheckSquare, Square } from "lucide-react-native";
import { useState } from "react";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CatsEyeUsage() {
  const [checked, setChecked] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCheck = () => {
    setChecked(!checked);
    navigation.replace("CatsEyeWrite");
  };

  return (
    <View style={styles.container}>
      <CatsEyeUsageAppbar />
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>캣츠아이란</Text>
          <Text style={styles.p}>
            낮은 물론 밤에 더 잘 보는 고양이의 눈처럼 24시간 언제든지 피해를
            입는 친구들을 돌보고 가해하는 친구들의 행동을 지켜보고 있다는
            의미입니다.
          </Text>
          <Text style={styles.title}>캣츠아이의 목적</Text>
          <Text style={styles.p}>
            가해자를 비난하고 이 곳에서 응징하자는 것이 아닙니다. 그들의 행동이
            비난받아 마땅할지라도 공개적으로 이 곳에서 사적보복이나 응징을 하는
            것또한 다른 이름의 폭력이기 때문입니다. 따라서 최대한 인격과 명예를
            존중해 줘야 하며 절제된 행동으로 가해자들의 잘못과 피해자의 상처를
            우리가 인지하고 지켜보고 있다는 신호를 주는 것이 목적입니다.
          </Text>
          <Text style={styles.title}>캣츠아이를 작성하면</Text>
          <Text style={styles.p}>
            작성한 사연은 작성자가 있는 지역사회나 공식가입한 학교선생님이나
            공식가입을 한 지역 담당 경찰관에 실시간 제보 됩니다.
          </Text>

          <Text style={styles.title}>철저하게 비밀이 보장됩니다.</Text>
          <Text style={styles.p}>
            본인이 올린 글은 본인만이 알 수 있으며 친구들이 홀파앱을 보자고 해도
            글을 올린 흔적을 찾을 수 없습니다
          </Text>

          <Text style={styles.title}>
            글을 작성, 수정, 삭제 시 비밀번호가 있습니다.
          </Text>
          <Text style={styles.p}>
            글을 작성하거나 수정, 삭제할 때 본인 확인을 위해 비밀번호를
            입력합니다. 비밀번호는 반드시 기억하셔야 합니다. 잊으면 수정, 삭제를
            할 수 없습니다.
          </Text>

          <Text style={styles.title}>지역사회에 알릴 수 있습니다.</Text>
          <Text style={styles.p}>
            자신이 올린 글이 작성자가 소속된 지역에 알려지게 됩니다. 같은 지역에
            있는 친구나 부모님, 선생님, 경찰관, 지역 모든 분들이 함께 관심을
            가질 수 있습니다.
          </Text>

          <Text style={styles.title}>
            학교선생님이나 지역담당경찰관에게 알릴 수가 있습니다.
          </Text>
          <Text style={styles.p}>
            자신이 올린 제보를 소속 학교선생님이나 자신이 속한 지역의 학교담당
            경찰관에게 알릴 수 있습니다. 둘 중에 하나 혹은 두가지 모두를 선택할
            수 있습니다. 반드시 해당 학교의 교사가 지정되어 있거나, 해당 지역
            학교담당 경찰관이 지정되어 있어야 선택할 수 있습니다. 없을 경우는 이
            기능을 사용할 수 없습니다
          </Text>

          <Text style={styles.title}>가해자에겐 어떤 효과가 기대될까요? </Text>
          <Text style={styles.p}>
            방관자의 침묵은 가해자에게 “거봐, 괜찮잖아”라는 잘못된 신호를 주게
            되는데요. 이제 적극개입자가 되면 가해자의 행동에 결코 동의하지
            않는다는 신호를 주게 됩니다. 그동안 가해자가 두려워, 개입했다가
            피곤해질 것 같아서, 다음 피해자가 될까봐, 내 일이 아니니까 등
            이런저런 이유로 외면하고 방관했던 우리들이 당당하게 친구의 위기를
            도울 수 있게 됩니다.
          </Text>

          <Text style={styles.title}>피해자에겐 어떤 효과가 기대될까요? </Text>
          <Text style={styles.p}>
            여러분이 개입하면 ‘그래 내 잘못만은 아니구나. '혼자가 아니구나.' 등
            나를 돕는 친구들이 있다는 사실에 희망을 가지고 어려움을 극복할
            용기를 낼겁니다. 그동안 피해자 주변 친구들의 침묵은 다른 애들도 다들
            가해자와 같은 생각을 하는 것이라는 잘못된 신호를 피해자에게 주어왔고
            결국 철저하게 고립되고 절망에 이르게 했었는데 이젠 그렇지 않습니다.
          </Text>

          <Text style={styles.title}>자신의 위치 설정 방법</Text>
          <Text style={styles.p}>
            여러분이 개입하면 ‘그래 내 잘못만은 아니구나. '혼자가 아니구나.' 등
            나를 돕는 친구들이 있다는 사실에 희망을 가지고 어려움을 극복할
            용기를 낼겁니다. 그동안 피해자 주변 친구들의 침묵은 다른 애들도 다들
            가해자와 같은 생각을 하는 것이라는 잘못된 신호를 피해자에게 주어왔고
            결국 철저하게 고립되고 절망에 이르게 했었는데 이젠 그렇지 않습니다.
          </Text>

          <Text style={styles.title}>학교설정방법</Text>
          <Text style={styles.p}>
            GPS기반에서 자신이 속한 곳에서 검색을 클릭하면 지역에 속한
            가입학교가 노출되게 됩니다. 그 학교를 선택하고 PIN 번호를 넣게 되면
            학교에 가입이 되게 됩니다. 이 경우도 철저히 익명처리 되므로 신분을
            알 수 없습니다. 자신의 소속학교가 가입을 하지 않았으면 사용할 수
            없습니다. 한번 학교에 가입하면 졸업 시 탈퇴해서 다른 학교를 선택하기
            전까지는 그대로 유지됩니다.
          </Text>

          <Text style={styles.title}>경찰청 및 경찰관 설정방법</Text>
          <Text style={styles.p}>
            GPS기반에서 자신이 속한 곳에서 검색을 클릭하면 지역에 속한 경찰청이
            노출되게 됩니다. 그 해당경찰청을 선택하면 선택된 경찰청의
            담당경찰관에게 내용이 전달되게 됩니다. 이 역시 해당 경찰청이
            공식가입을 하지 않았으면 노출이 되지 않거나 전달되지 않습니다. 한번
            경찰청에 가입하면 다른 경찰청을 선택하기 전까지는 그대로 유지됩니다.
          </Text>

          <View style={styles.foucs}>
            <Text style={styles.focusText}>작성 시 유의점</Text>
          </View>

          <Text>1. 절대 허위사실을 제보해서는 안됩니다.</Text>
          <Text>
            2.
            <Text style={{ color: "skyblue", fontWeight: "bold" }}>
              지역사회에 공유하기
            </Text>
            에서는 절대로 실명(이름)이나 개인을 알 수 있는 말 즉, 특정할 수 있는
            단어를 절대 사용해서는 안 됩니다.
          </Text>
          <Text>
            3.
            <Text style={{ color: "skyblue", fontWeight: "bold" }}>
              학교나 경찰관 등 공적기관에 제보하기는
            </Text>
            실명을 포함해서 6하원칙에 따라 자세하게 기술해도 됩니다. 거듭
            말하지만 허위 사실은 절대 제보해서는 안 됩니다.
          </Text>

          <TouchableOpacity
            onPress={() => {
              console.log("작성예시보기");
            }}
            style={styles.example}
          >
            <Text style={styles.exampleText}>작성예시 보기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCheck}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 40,
              height: 28,
            }}
          >
            {checked ? (
              <CheckSquare size={20} color="#f57c00" />
            ) : (
              <Square size={20} color="#f57c00" />
            )}
            <Text
              style={{
                fontSize: 16,
                marginLeft: 15,
                fontWeight: "700",
                marginBottom: 3,
              }}
            >
              캣츠아이 사용법을 이해했습니다.
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
  foucs: {
    alignSelf: "center",
    backgroundColor: "#FFC107",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 25,
    marginBottom: 20,
  },
  focusText: { color: "#0D2A5E", fontSize: 16, fontWeight: "700" },
  example: {
    backgroundColor: "red",
    alignSelf: "flex-start",
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 100,
    marginBottom: 70,
  },
  exampleText: { fontSize: 14, color: "white", fontWeight: "700" },
});
