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
import SelectHomeScreen from "../screens/SelectHomeScreen";
import TermsAndPrivacyScreen from "../screens/TermsAndPrivacyScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeEmailOrNameScreen from "../screens/ChangeEmailOrNameScreen";
import SelectEventFiltersScreen from "../screens/SelectEventFiltersScreen";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabsHome"
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
        name="SelectHomeScreen"
        component={SelectHomeScreen}
        options={{ headerTitle: "Select Home Screen" }}
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
      <Stack.Screen
        name="SelectEventFilters"
        component={SelectEventFiltersScreen}
        options={({ navigation }) => ({
          headerTitle: "Select Filters",
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: () => (
            <AntDesign
              name="close"
              size={25}
              style={{ marginRight: 10 }}
              color={colors.text}
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
