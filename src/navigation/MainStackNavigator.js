import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CompareScreen from "../screens/CompareScreen";
import PriceAlertScreen from "../screens/PriceAlertScreen";
import ConverterScreen from "../screens/ConverterScreen";
import BottomTabs from "./BottomTabNavigation";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "Sign Up" }}
      />
      <Stack.Screen
        name="PriceAlert"
        component={PriceAlertScreen}
        options={{ headerTitle: "Price Alerts" }}
      />
      <Stack.Screen
        name="Compare"
        component={CompareScreen}
        options={{ headerTitle: "Compare Crypto" }}
      />
      <Stack.Screen
        name="Converter"
        component={ConverterScreen}
        options={{ headerTitle: "Currency Converter" }}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
