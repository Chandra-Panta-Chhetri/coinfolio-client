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
  DiscoverEventFiltersScreen,
  EventDetailScreen,
  SearchCryptoScreen,
  AssetDetailScreen,
  AssetDetailEventFiltersScreen,
  SelectTransactionCoinScreen
} from "../../screens";
import { CloseIconButton } from "../../shared-components";
import { TYPOGRAPHY } from "../../styles";
import { connect } from "react-redux";
import { selectIsUserAuthenticated } from "../../redux/user";
import { GLOBAL_CONSTANTS } from "../../constants";
import { AssetDetailFavorite, AssetDetailHeaderTitle } from "../../screens/asset-detail/components";
import { selectIsAddingTransaction } from "../../redux/portfolio";

const Stack = createStackNavigator();

const RootNavigator = ({ isAuthenticated, isAddingTransaction }) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: TYPOGRAPHY.title, headerTitleAlign: "center" }}>
      <Stack.Screen name="BottomTabsHome" component={BottomTabNavigator} options={{ headerShown: false }} />
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{
              headerTitle: "Change Password"
            }}
          />
          <Stack.Screen
            name="ChangeEmailOrName"
            component={ChangeEmailOrNameScreen}
            options={{
              headerTitle: "Change Email or Name"
            }}
          />
          <Stack.Screen
            name="SelectTransactionCoin"
            component={SelectTransactionCoinScreen}
            options={{
              headerTitle: "Select a Coin"
            }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransactionScreen}
            options={{
              headerTitle: "Add Transaction",
              gestureEnabled: !isAddingTransaction,
              headerLeft: isAddingTransaction ? () => undefined : undefined
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Login" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: "Sign Up" }} />
        </>
      )}
      <Stack.Screen name="PriceAlert" component={PriceAlertScreen} options={{ headerTitle: "Price Alerts" }} />
      <Stack.Screen
        name="CompareCurrency"
        component={CompareCurrencyScreen}
        options={{
          headerTitle: "Compare Currencies"
        }}
      />
      <Stack.Screen
        name="ConvertCurrency"
        component={ConvertCurrencyScreen}
        options={{
          headerTitle: "Currency Converter"
        }}
      />
      <Stack.Screen
        name="SelectCurrency"
        component={SelectCurrencyScreen}
        options={{ headerTitle: "Select Currency" }}
      />
      <Stack.Screen
        name="SelectHomeScreen"
        component={SelectHomeScreen}
        options={{
          headerTitle: "Select Home Screen"
        }}
      />
      <Stack.Screen
        name="TermsAndPrivacy"
        component={TermsAndPrivacyScreen}
        options={{
          headerTitle: "Terms and Privacy"
        }}
      />
      <Stack.Screen
        name="AssetDetail"
        component={AssetDetailScreen}
        options={({ route }) => ({
          headerTitle: () => <AssetDetailHeaderTitle {...route} />,
          headerRight: () => <AssetDetailFavorite {...route} />
        })}
      />
      <Stack.Screen
        name="DiscoverEventFilters"
        component={DiscoverEventFiltersScreen}
        options={({ navigation }) => ({
          headerTitle: "Select Filters",
          headerLeft: null,
          headerRight: () => (
            <CloseIconButton style={{ marginRight: GLOBAL_CONSTANTS.MD_MARGIN }} onPress={() => navigation.goBack()} />
          )
        })}
      />
      <Stack.Screen
        name="AssetDetailEventFilters"
        component={AssetDetailEventFiltersScreen}
        options={({ navigation }) => ({
          headerTitle: "Select Filters",
          headerLeft: null,
          headerRight: () => (
            <CloseIconButton style={{ marginRight: GLOBAL_CONSTANTS.MD_MARGIN }} onPress={() => navigation.goBack()} />
          )
        })}
      />
      <Stack.Screen name="EventDetails" component={EventDetailScreen} options={{ headerTitle: "Event Details" }} />
      <Stack.Screen name="SearchCrypto" component={SearchCryptoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsUserAuthenticated(state),
  isAddingTransaction: selectIsAddingTransaction(state)
});

export default connect(mapStateToProps)(RootNavigator);
