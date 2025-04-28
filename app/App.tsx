import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StatusBar } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MyTabs } from "./components/Tab/MyTabs";
import PostDetail from "./components/PostDetail/PostDetail";
import CreatePost from "./components/CreatePost/CreatePost";

// 1. Stack 타입 설정
export type RootStackParamList = {
  Tabs: undefined;
  PostDetail: { post: any };
  CreatePost: undefined;
};

// 2. Stack 생성
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View className="flex-1">
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

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
    <SafeAreaProvider>
      <AppLayout />
    </SafeAreaProvider>
  );
}
