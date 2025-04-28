import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CreatePostAppbar } from "./CreatePostAppbar";
import ProblemFilter from "./filter/ProblemFilter";
import ReligiousFilter from "./filter/ReligiousFilter";
import UrgencyFilter from "./filter/UrgencyFilter";

export default function CreatePost() {
  const [postContent, setPostContent] = useState<string>("");
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (textInputRef.current) {
      scrollViewRef.current?.scrollToFocusedInput(textInputRef.current, 120);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <CreatePostAppbar />

        <KeyboardAwareScrollView
          className="bg-[#d4f6ff]"
          ref={scrollViewRef}
          enableOnAndroid
          keyboardOpeningTime={0}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-2 mt-2">
            <ProblemFilter />
            <UrgencyFilter />
            <ReligiousFilter />

            <View className="bg-white rounded-2xl shadow-lg w-full mb-5">
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
                value={postContent}
                onChangeText={setPostContent}
                returnKeyType="done"
                blurOnSubmit
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
