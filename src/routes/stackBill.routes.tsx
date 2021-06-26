import React from "react";
import BillUp from "../pages/BillUp";
import Bill from "../pages/Bill";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const StackRoutesBill: React.FC = () => {
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

          if (route.name === "Contas") {
            iconName = focused ? "cash-outline" : "ios-cash-outline";
          } else if (route.name === "Cadastrar") {
            iconName = focused
              ? "add-circle-outline"
              : "ios-add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Contas" component={Bill} />
      <Tab.Screen name="Cadastrar" component={BillUp} />
    </Tab.Navigator>
  );
};

export default StackRoutesBill;
