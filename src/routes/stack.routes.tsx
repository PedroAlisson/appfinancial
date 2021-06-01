import React from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Invest from "../pages/Invest";
import InvestUp from "../pages/InvestUp";
import { NavigationContainer } from "@react-navigation/native";

const StackRoutes: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Invest" component={Invest} />
        <Tab.Screen name="InvestUp" component={InvestUp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default StackRoutes;
