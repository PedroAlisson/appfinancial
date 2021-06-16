import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import StackRoutes from "./stack.routes";
import Card from "../components/Cards/CardPrimary";
import CardUser from "../components/Cards/CardUsers";

import CardAlter from "../components/Cards/CardAlter";
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
    <Auth.Screen name="Invest" component={StackRoutes} />
    <Auth.Screen name="Users" component={CardUser} />
    <Auth.Screen name="Card" component={Card} />
    <Auth.Screen name="CardAlter" component={CardAlter} />
  </Auth.Navigator>
);
export default AuthRoutes;
