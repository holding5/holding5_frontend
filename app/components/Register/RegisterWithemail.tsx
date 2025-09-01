import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";

const domainList = [
  { label: "gmail.com", value: "gmail.com" },
  { label: "naver.com", value: "naver.com" },
  { label: "daum.net", value: "daum.net" },
  { label: "직접입력", value: "custom" }, // '직접입력' 옵션
];

export default function RegisterWithemail() {
  const [localPart, setLocalPart] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("gmail.com");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.assignContainer}>
        <View style={styles.assignCard}>
          <FontAwesome name="bookmark" size={24} color="#ff7d7dff" />
          <View style={styles.title}>
            <Octicons name="feed-heart" size={24} color="#ff7d7dff" />
            <Text
              className="text-gray-700 font-gmarketMedium ml-2 "
              style={{ fontSize: 16 }}
            >
              생명존중 및 선플 서약서
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              className="text-gray-700 font-gmarketMedium"
              style={styles.text}
            >
              생명을 소중하게 생각하겠습니다.
            </Text>
            <Text
              className="text-gray-700 font-gmarketMedium"
              style={styles.text}
            >
              그리고 아름다운 세상을
            </Text>
            <Text
              className="text-gray-700 font-gmarketMedium"
              style={styles.text}
            >
              만들기 위해 선플운동을
            </Text>
            <Text
              className="text-gray-700 font-gmarketMedium"
              style={styles.text}
            >
              실천하기로 서약합니다.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Ionicons name="radio-button-off" size={24} color="#b8b8b8ff" />
            <Text
              className="text-gray-700 font-gmarketMedium ml-2"
              style={styles.text}
            >
              서약
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 아이디 */}
          <View style={styles.row}>
            <Text style={styles.label}>아이디</Text>
            <View style={styles.inputWrapper}>
              {/* 이메일 앞부분 입력창 */}
              <TextInput
                style={styles.emailInput}
                value={localPart}
                onChangeText={setLocalPart}
              />
              <Text style={styles.atSymbol}>@</Text>

              {/* 2. 조건부 렌더링: '직접입력'이 선택되었는지 확인 */}
              {selectedDomain === "custom" ? (
                // '직접입력' 선택 시 나타나는 입력창
                <TextInput
                  style={styles.emailInput}
                  placeholder="직접입력"
                  autoFocus={true} // 선택 시 바로 입력 가능하도록 포커스
                />
              ) : (
                // 도메인 선택 Picker
                <View style={styles.pickerWrapper}>
                  <RNPickerSelect
                    onValueChange={(value) => setSelectedDomain(value)}
                    items={domainList}
                    value={selectedDomain}
                    placeholder={{}} // placeholder를 사용하지 않음
                    style={pickerSelectStyles}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>닉네임</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="최소 2자 이상의 영문 혹은 한글"
              />
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.textInput}
              placeholder="8~12자리 영문, 숫자, 특수문자 혼합"
              secureTextEntry
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput style={styles.textInput} secureTextEntry />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.textInput}
              placeholder="최소 2자 이상의 영문 혹은 한글"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>성별</Text>
            <View style={styles.genderSelector}>
              <TouchableOpacity style={styles.genderOption}>
                <Ionicons name="radio-button-off" size={24} color="#b8b8b8ff" />
                <Text style={styles.genderText}>남성</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderOption}>
                <Ionicons name="radio-button-on" size={24} color="#4A90E2" />
                <Text style={styles.genderText}>여성</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>생년월일</Text>
            <TextInput style={styles.birthInput} placeholder="생년" />
            <TextInput style={styles.birthInput} placeholder="월" />
            <TextInput style={styles.birthInput} placeholder="일" />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} />
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>인증 요청</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>인증번호 입력</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} />
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>인증 확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>활동 지역</Text>
            <TextInput style={styles.textInput} />
          </View>

          <View style={styles.agreementRow}>
            <Ionicons name="radio-button-off" size={24} color="#b8b8b8ff" />
            <Text style={styles.agreementText}>
              서비스 이용 약관 및 개인정보처리방침에 동의합니다.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>가입하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  assignContainer: {
    flex: 1,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  assignCard: {
    backgroundColor: "#f6f6f6ff",
    shadowColor: "#3b3b3bff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3ff",
  },
  content: { justifyContent: "center", alignItems: "center", marginTop: 12 },
  text: { fontSize: 14 },
  formContainer: {
    flex: 2,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    width: 100, // 라벨 너비 고정으로 정렬 맞춤
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  emailInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  pickerWrapper: {
    flex: 1, // emailInput과 동일한 공간을 차지하도록
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center", // 내부 Picker 텍스트를 수직 중앙 정렬
  },
  atSymbol: {
    marginHorizontal: 8,
    fontSize: 16,
    color: "#888",
  },
  birthInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
    marginHorizontal: 2,
  },
  actionButton: {
    backgroundColor: "#888",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  genderSelector: {
    flex: 1,
    flexDirection: "row",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  genderText: {
    marginLeft: 6,
    fontSize: 16,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  agreementText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#90b5e5ff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: "black",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: "black",
  },
});
