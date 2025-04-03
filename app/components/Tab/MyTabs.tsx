import React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WallTab } from "./Wall/WallTab";
import { MessageTab } from "./Message/MessageTab";
import { OutsideTab } from "./Outside/OutsideTab";

const Tab = createMaterialTopTabNavigator();

export const MyTabs = () => (
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
      tabBarActiveTintColor: "#f472b6",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#f5f5f5" },
      tabBarIndicatorStyle: { backgroundColor: "#f472b6" },
      headerShown: false,
    })}
  >
    <Tab.Screen name="홀파 담벼락" component={WallTab} />
    <Tab.Screen name="희망메세지" component={MessageTab} />
    <Tab.Screen name="세상밖으로" component={OutsideTab} />
  </Tab.Navigator>
);
