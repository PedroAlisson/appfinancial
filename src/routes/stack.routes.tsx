import React from "react";
import Invest from "../pages/Invest";
import InvestUp from "../pages/InvestUp";
import Bill from "../pages/Bill";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const StackRoutes: React.FC = () => {
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
      <Tab.Screen name="Cadastro de Investimentos" component={InvestUp} />
      <Tab.Screen name="Cadastro de Contas" component={Bill} />
    </Tab.Navigator>
  );
};

export default StackRoutes;
