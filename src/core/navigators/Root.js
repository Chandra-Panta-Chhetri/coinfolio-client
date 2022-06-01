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
  SearchCryptoScreen,
  AssetDetailScreen
} from "../../screens";
import { CloseIconButton } from "../../shared-components";
import { TYPOGRAPHY } from "../../styles";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabsHome" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "Login", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "Sign Up", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="PriceAlert"
        component={PriceAlertScreen}
        options={{ headerTitle: "Price Alerts", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="CompareCurrency"
        component={CompareCurrencyScreen}
        options={{
          headerTitle: "Compare Currencies",
          headerTitleAlign: "center",
          headerTitleStyle: TYPOGRAPHY.headline
        }}
      />
      <Stack.Screen
        name="ConvertCurrency"
        component={ConvertCurrencyScreen}
        options={{
          headerTitle: "Currency Converter",
          headerTitleAlign: "center",
          headerTitleStyle: TYPOGRAPHY.headline
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ headerTitle: "Add Transaction", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="SelectCurrency"
        component={SelectCurrencyScreen}
        options={{ headerTitle: "Select Currency", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="SelectHomeScreen"
        component={SelectHomeScreen}
        options={{
          headerTitle: "Select Home Screen",
          headerTitleAlign: "center",
          headerTitleStyle: TYPOGRAPHY.headline
        }}
      />
      <Stack.Screen
        name="TermsAndPrivacy"
        component={TermsAndPrivacyScreen}
        options={{
          headerTitle: "Terms and Privacy",
          headerTitleAlign: "center",
          headerTitleStyle: TYPOGRAPHY.headline
        }}
      />
      <Stack.Screen
        name="AssetDetail"
        component={AssetDetailScreen}
        options={{ headerTitle: "Asset Detail", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerTitle: "Change Password", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen
        name="ChangeEmailOrName"
        component={ChangeEmailOrNameScreen}
        options={{
          headerTitle: "Change Email or Name",
          headerTitleAlign: "center",
          headerTitleStyle: TYPOGRAPHY.headline
        }}
      />
      <Stack.Screen
        name="SelectEventFilters"
        component={SelectEventFiltersScreen}
        options={({ navigation }) => ({
          headerTitle: "Select Filters",
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: () => <CloseIconButton style={{ marginRight: 10 }} onPress={() => navigation.goBack()} />,
          headerTitleStyle: TYPOGRAPHY.headline
        })}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailScreen}
        options={{ headerTitle: "Event Details", headerTitleAlign: "center", headerTitleStyle: TYPOGRAPHY.headline }}
      />
      <Stack.Screen name="SearchCrypto" component={SearchCryptoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
