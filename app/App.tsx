import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text, View, StatusBar } from "react-native";
import Constants from "expo-constants"; // Constants 가져오기
import { useFonts } from "expo-font"; // expo-font 사용

import { MyTabs } from "./components/Tab/MyTabs";

export default function App() {
  const [fontsLoaded] = useFonts({
    GmarketSansBold: require("./assets/fonts/GmarketSansTTFBold.ttf"),
    GmarketSansLight: require("./assets/fonts/GmarketSansTTFLight.ttf"),
    GmarketSansMedium: require("./assets/fonts/GmarketSansTTFMedium.ttf"),
    KoPubWoldMedium: require("./assets/fonts/Medium.ttf"),
    KoPubWoldBold: require("./assets/fonts/Bold.ttf"),
    KoPubWoldLight: require("./assets/fonts/Light.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <StatusBar barStyle="default" translucent={true} />
      <View
        className="flex-1 font-gmarketLight"
        style={{
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <View className="bg-white p-4">
          <Text className="text-pink-400 text-xl font-gmarketBold">
            {/*로고 이미지로 대체 예정 */}
            Holding5
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaView>
  );
}
