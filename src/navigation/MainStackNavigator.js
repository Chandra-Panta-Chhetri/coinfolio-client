import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CompareScreen from "../screens/CompareScreen";
import PriceAlertScreen from "../screens/PriceAlertScreen";
import ConverterScreen from "../screens/ConverterScreen";
import BottomTabs from "./BottomTabNavigation";
import AddTransactionScreen from "../screens/AddTransactionScreen";
import SelectCurrencyScreen from "../screens/SelectCurrencyScreen";
import SelectLaunchScreen from "../screens/SelectLaunchScreen";
import TermsAndPrivacyScreen from "../screens/TermsAndPrivacyScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeEmailOrNameScreen from "../screens/ChangeEmailOrNameScreen";

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
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ headerTitle: "Add Transaction" }}
      />
      <Stack.Screen
        name="SelectCurrency"
        component={SelectCurrencyScreen}
        options={{ headerTitle: "Select Currency" }}
      />
      <Stack.Screen
        name="SelectLaunchScreen"
        component={SelectLaunchScreen}
        options={{ headerTitle: "Select Launch Screen" }}
      />
      <Stack.Screen
        name="TermsAndPrivacy"
        component={TermsAndPrivacyScreen}
        options={{ headerTitle: "Terms and Privacy" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerTitle: "Change Password" }}
      />
      <Stack.Screen
        name="ChangeEmailOrName"
        component={ChangeEmailOrNameScreen}
        options={{ headerTitle: "Change Email or Name" }}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
