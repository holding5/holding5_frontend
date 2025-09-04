import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WallTab } from "./Wall/WallTab";
import { MessageTab } from "./Message/MessageTab";
import { OutsideTab } from "./Outside/OutsideTab";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

const Tab = createMaterialTopTabNavigator();

export const MyTabs = () => {
  return (
    <>
      <View
        className="bg-white px-5 pb-3 justify-between items-center z-10 flex-row"
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
        <View className="flex-row items-center mt-2 justify-between gap-x-4">
          <TouchableOpacity>
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-ellipses-sharp"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
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
};
