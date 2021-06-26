import React from "react";
import Invest from "../pages/Invest";
import InvestUp from "../pages/InvestUp";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const StackRoutesInvest: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "gold",
        inactiveTintColor: "white",
        labelPosition: "beside-icon",
        style: {
          backgroundColor: "#312e38",
          alignItems: "center",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Investimentos") {
            iconName = focused ? "cash-outline" : "ios-cash-outline";
          } else if (route.name === "Investir") {
            iconName = focused
              ? "add-circle-outline"
              : "ios-add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Investimentos" component={Invest} />
      <Tab.Screen name="Investir" component={InvestUp} />
    </Tab.Navigator>
  );
};

export default StackRoutesInvest;
