import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CreatePostAppbar } from "./CreatePostAppbar";
import ProblemFilter from "./filter/ProblemFilter";
import ReligiousFilter from "./filter/ReligiousFilter";
import UrgencyFilter from "./filter/UrgencyFilter";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePost } from "../../context/PostContext";
import {
  Camera,
  Mic,
  Image as ImageIcon,
  X,
  CheckCircle,
  Circle,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

const problemOptions = [
  { key: "daily_talk", value: "가벼운 이야기" },
  { key: "bullying", value: "왕따, 학교폭력" },
  { key: "academic", value: "성적, 학업문제" },
  { key: "relationship", value: "친구, 이성문제" },
  { key: "parents", value: "부모님과 갈등" },
  { key: "teacher", value: "선생님과 갈등" },
  { key: "economic", value: "가정형편, 경제" },
  { key: "appearance", value: "외모문제" },
  { key: "etc", value: "기타문제" },
  { key: "overcome", value: "극복수기" },
  { key: "catseye", value: "캣츠아이" },
];

const situationOptions = [
  { key: "level_1", value: "괜찮아요" },
  { key: "level_2", value: "약간 심각해요" },
  { key: "level_3", value: "심각해요" },
  { key: "level_4", value: "많이 심각해요" },
  { key: "level_5", value: "최고로 심각해요" },
];
const mindOptions = [
  { key: "any", value: "상관없음" },
  { key: "anxious_1", value: "약간 불안해요" },
  { key: "anxious_2", value: "불안해요" },
  { key: "anxious_3", value: "많이 불안해요" },
  { key: "anxious_4", value: "죽을만큼 불안해요" },
];

const religionOptions = [
  { key: "christianity", value: "기독교인" },
  { key: "catholicism", value: "천주교인" },
  { key: "buddhism", value: "불교인" },
  { key: "none", value: "무교" },
];

interface PostFormState {
  problem: string | null;
  situation: string | null;
  mind: string | null;
  religion: string | null;
  mainSelection: string | null;
  subSelection: string | null;
  content: string;
}

export default function CreatePost() {
  const {
    form,
    handleFilterChange,
    handleSubmit,
    resetForm,
    addAttachment,
    removeAttachment,
    setAnonymous,
  } = usePost();
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  const handleSelectMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("알림", "갤러리 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true, // 여러 개 선택 허용
    });

    if (!result.canceled && result.assets) {
      result.assets.forEach((asset) => {
        addAttachment({
          uri: asset.uri,
          type: asset.type === "video" ? "video" : "image",
        });
      });
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("알림", "카메라 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const asset = result.assets[0];
      addAttachment({
        uri: asset.uri,
        type: "image",
      });
    }
  };

  const handleRecordAudio = async () => {
    if (recording) {
      // 녹음 중지
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        addAttachment({
          uri,
          type: "audio",
        });
      }
      setRecording(undefined);
    } else {
      // 녹음 시작
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("알림", "마이크 접근 권한이 필요합니다.");
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
      } catch (err) {
        console.error("녹음 시작 실패:", err);
      }
    }
  };

  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigate.addListener("focus", () => {
      resetForm();
    });
    return unsubscribe;
  }, [navigate]);

  const handleFocus = () => {
    if (textInputRef.current) {
      scrollViewRef.current?.scrollToFocusedInput(textInputRef.current, 120);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <CreatePostAppbar onSubmit={handleSubmit} />
        <KeyboardAwareScrollView
          className="bg-[#d4f6ff]"
          ref={scrollViewRef}
          enableOnAndroid
          keyboardOpeningTime={0}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="always"
        >
          <View className="p-4">
            <ProblemFilter
              options={problemOptions}
              selectedValue={form.problem}
              onSelect={(key) => {
                handleFilterChange("problem", key);

                if (key === "catseye") {
                  navigate.navigate("CatsEyeWrite");
                }

                if (key === "overcome") {
                  navigate.navigate("OverComing");
                }
              }}
            />
            <UrgencyFilter
              situationOptions={situationOptions}
              mindOptions={mindOptions}
              selectedSituation={form.situation}
              selectedMind={form.mind}
              onSelectSituation={(key) => handleFilterChange("situation", key)}
              onSelectMind={(key) => handleFilterChange("mind", key)}
            />
            <ReligiousFilter
              options={religionOptions}
              selectedValue={form.religion}
              onSelect={(key) => handleFilterChange("religion", key)}
            />

            <View className="bg-white rounded-2xl shadow-lg w-full mb-5 border border-gray-200">
              {form.attachments.length > 0 && (
                <View className="flex-row flex-wrap p-2 border-b border-gray-200">
                  {form.attachments.map((file) => (
                    <View key={file.uri} className="relative m-1">
                      <Image
                        source={{ uri: file.uri }}
                        className="w-20 h-20 rounded-lg"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          removeAttachment && removeAttachment(file.uri)
                        }
                        className="absolute -top-1 -right-1 bg-black/60 rounded-full p-0.5"
                      >
                        <X size={14} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <View className="flex-row items-center  p-3 space-x-4">
                <TouchableOpacity onPress={handleSelectMedia}>
                  <ImageIcon size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTakePhoto}>
                  <Camera size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRecordAudio}>
                  <Mic size={24} color={isRecording ? "red" : "#6B7280"} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setAnonymous(!form.isAnonymous)}
                >
                  {form.isAnonymous ? (
                    <CheckCircle size={24} color="#3B82F6" />
                  ) : (
                    <Circle size={24} color="gray" />
                  )}
                  <Text className="ml-2 text-lg text-gray-700 font-gmarketMedium">
                    익명
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                ref={textInputRef}
                onFocus={handleFocus}
                className="font-gmarketMedium text-gray-700 text-base"
                style={{
                  minHeight: 150,
                  padding: 10,
                  textAlignVertical: "top",
                }}
                placeholder="내용을 입력해주세요..."
                multiline
                value={form.content}
                onChangeText={(text) => handleFilterChange("content", text)}
                returnKeyType="default"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
