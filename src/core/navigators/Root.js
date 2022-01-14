import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTab";
import { useTheme } from "react-native-paper";
import {
  LoginScreen,
  SignUpScreen,
  CompareCurrencyScreen,
  PriceAlertScreen,
  ConvertCurrencyScreen,
  AddTransactionScreen,
  SelectCurrencyScreen,
  SelectHomeScreen,
  TermsAndPrivacyScreen,
  ChangePasswordScreen,
  ChangeEmailOrNameScreen,
  SelectEventFiltersScreen,
  EventDetailScreen,
  SearchCryptoScreen
} from "../../screens";
import { CloseIconButton } from "../../shared-components";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabsHome"
        component={BottomTabNavigator}
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
        name="CompareCurrency"
        component={CompareCurrencyScreen}
        options={{ headerTitle: "Compare Currencies" }}
      />
      <Stack.Screen
        name="ConvertCurrency"
        component={ConvertCurrencyScreen}
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
            <CloseIconButton
              style={{ marginRight: 10 }}
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailScreen}
        options={{ headerTitle: "Event Details" }}
      />
      <Stack.Screen
        name="SearchCrypto"
        component={SearchCryptoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
