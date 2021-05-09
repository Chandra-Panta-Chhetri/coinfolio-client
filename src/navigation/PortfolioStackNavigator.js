import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PortfolioScreen from "../screens/PortfolioScreen";

const Stack = createStackNavigator();

function PortfolioStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
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
    </Stack.Navigator>
  );
}

export default PortfolioStackNavigator;
