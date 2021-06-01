import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Invest from "../pages/Invest";
import InvestUp from "../pages/InvestUp";
import StackRoutes from "./stack.routes";
const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#312e38" },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Invest" component={Invest} />
    <Auth.Screen name="InvestUp" component={InvestUp} />
  </Auth.Navigator>
);
export default AuthRoutes;
