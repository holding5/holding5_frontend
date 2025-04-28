import React from "react";
import { Image, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WallTab } from "./Wall/WallTab";
import { MessageTab } from "./Message/MessageTab";
import { OutsideTab } from "./Outside/OutsideTab";

const Tab = createMaterialTopTabNavigator();

export const MyTabs = () => (
  <>
    <View
      className="bg-white px-5 pb-3 justify-center items-start z-10"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Image
        source={require("../../assets/logo.jpg")}
        className="w-[130px] h-[40px]"
        style={{ resizeMode: "contain" }}
      />
    </View>

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ color }) => (
          <View className="items-center">
            <Text
              style={{
                color,
                fontSize: 15,
                fontFamily: "GmarketSansMedium",
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
        tabBarActiveTintColor: "#F893B1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f5f5f5" },
        tabBarIndicatorStyle: { backgroundColor: "#F893B1" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="홀파 담벼락" component={WallTab} />
      <Tab.Screen name="희망메세지" component={MessageTab} />
      <Tab.Screen name="세상밖으로" component={OutsideTab} />
    </Tab.Navigator>
  </>
);
