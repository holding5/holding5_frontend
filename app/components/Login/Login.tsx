import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useState } from "react";
import { Alert } from "react-native";

const logoImage = require("../../assets/logo_image.png");
const kakaotalk = require("../../assets/kakaotalk.png");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLoginMutation();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    mutate({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoImage} resizeMode="contain" />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formSection}>
          <View style={styles.inputsColumn}>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="ID (이메일 주소)"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={{ height: 8 }} />
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="비밀번호"
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.accountSection}>
          <TouchableOpacity>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.sperator}>|</Text>
          <TouchableOpacity>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.sperator}>|</Text>

          <TouchableOpacity>
            <Text>비밀번호 설정</Text>
          </TouchableOpacity>
          <Text style={styles.sperator}>|</Text>

          <TouchableOpacity
            onPress={() => {
              navigate.navigate("RegisterWithemail");
            }}
          >
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.kakaotalkContainer}>
          <Image
            source={kakaotalk}
            style={styles.kakaotalkImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            <Text style={{ fontSize: 16 }}>카카오톡으로 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: "50%", height: undefined, aspectRatio: 1 },
  formContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  formSection: {
    flexDirection: "row",
  },
  inputsColumn: {
    flex: 1,
    marginRight: 8,
  },
  textInputWrapper: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  textInput: {
    fontSize: 16,
  },
  loginButton: {
    width: 100,
    backgroundColor: "#F9C47E",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kakaotalkContainer: {
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dbdbdbff",
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  kakaotalkImage: { width: 50, height: 50 },
  sperator: { fontSize: 14, color: "#333", marginHorizontal: 5 },
});
