import React from "react";
import BillUp from "../pages/BillUp";
import Bill from "../pages/Bill";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const StackRoutesBill: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
        labelPosition: "beside-icon",
        style: {
          backgroundColor: "#312e38",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen name="Contas" component={Bill} />
      <Tab.Screen name="Cadastrar" component={BillUp} />
    </Tab.Navigator>
  );
};

export default StackRoutesBill;
