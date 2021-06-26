import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import StackRoutesInvest from "./stackInvest.routes";
import StackRoutesBill from "./stackBill.routes";
import Card from "../components/Cards/CardPrimary";
import CardBill from "../components/Cards/CardPrimaryBill";
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
    <Auth.Screen name="Home" component={Home} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Invest" component={StackRoutesInvest} />
    <Auth.Screen name="Bill" component={StackRoutesBill} />
    <Auth.Screen name="Users" component={CardUser} />
    <Auth.Screen name="Card" component={Card} />
    <Auth.Screen name="CardBill" component={CardBill} />
    <Auth.Screen name="CardAlter" component={CardAlter} />
  </Auth.Navigator>
);
export default AuthRoutes;
