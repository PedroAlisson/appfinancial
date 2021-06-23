import React from "react";
import Invest from "../pages/Invest";
import InvestUp from "../pages/InvestUp";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const StackRoutesInvest: React.FC = () => {
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
      <Tab.Screen name="Investimentos" component={Invest} />
      <Tab.Screen name="Investir" component={InvestUp} />
    </Tab.Navigator>
  );
};

export default StackRoutesInvest;
