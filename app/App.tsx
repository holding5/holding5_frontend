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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CatsEyeWrite from "./components/CreatePost/CatsEyeWrite/CatsEyeWrite";
import CatsEyeUsage from "./components/CreatePost/CatsEyeWrite/CatsEyeUsage";
import PoliceWrite from "./components/CreatePost/CatsEyeWrite/PoliceWrite";
import SchoolWrite from "./components/CreatePost/CatsEyeWrite/SchoolWrite";
import LocalWrite from "./components/CreatePost/CatsEyeWrite/LocalWrite";
import OverComing from "./components/CreatePost/OverComing";
import { PostProvider } from "./context/PostContext";
import OverComingWrite from "./components/CreatePost/OverComingWrite";
import OverComingRelated from "./components/CreatePost/OverComingRelated";
import Login from "./components/Login/Login";
import RegisterWithemail from "./components/Register/RegisterWithemail";
import { AuthProvider } from "./context/LoginContext";
import { useAuth } from "./context/LoginContext";
import UpdatePost from "./components/UpdatePost/UpdatePost";
// 1. Stack 타입 설정
export type RootStackParamList = {
  Tabs: undefined;
  PostDetail: { post: any };
  CreatePost: undefined;
  CatsEyeWrite: undefined;
  CatsEyeUsage: undefined;
  LocalWrite: undefined;
  PoliceWrite: undefined;
  SchoolWrite: undefined;
  OverComing: undefined;
  OverComingWrite: undefined;
  OverComingRelated: undefined;
  Login: undefined;
  RegisterWithemail: undefined;
  UpdatePost: { postId: number };
};

// 2. Stack 생성
const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

function AppLayout() {
  const insets = useSafeAreaInsets();
  const { userToken, isLoading } = useAuth();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View className="flex-1">
        <NavigationContainer>
          <PostProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {userToken ? (
                <>
                  <Stack.Screen name="Tabs" component={MyTabs} />
                  <Stack.Screen name="PostDetail" component={PostDetail} />
                  <Stack.Screen name="CreatePost" component={CreatePost} />
                  <Stack.Screen name="CatsEyeWrite" component={CatsEyeWrite} />
                  <Stack.Screen name="CatsEyeUsage" component={CatsEyeUsage} />
                  <Stack.Screen name="LocalWrite" component={LocalWrite} />
                  <Stack.Screen name="PoliceWrite" component={PoliceWrite} />
                  <Stack.Screen name="SchoolWrite" component={SchoolWrite} />
                  <Stack.Screen name="OverComing" component={OverComing} />
                  <Stack.Screen
                    name="OverComingWrite"
                    component={OverComingWrite}
                  />
                  <Stack.Screen
                    name="OverComingRelated"
                    component={OverComingRelated}
                  />
                  <Stack.Screen name="UpdatePost" component={UpdatePost} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen
                    name="RegisterWithemail"
                    component={RegisterWithemail}
                  />
                </>
              )}
            </Stack.Navigator>
          </PostProvider>
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
