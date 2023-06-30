import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import {
  LoginScreen,
  SignUpScreen,
  CompareCurrencyScreen,
  PriceAlertScreen,
  ConvertCurrencyScreen,
  AddEditTransactionScreen,
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
  SelectTransactionCoinScreen,
  HoldingOverviewScreen
} from "../screens";
import { CloseIconButton } from "../components";
import { TYPOGRAPHY } from "../styles";
import { connect } from "react-redux";
import { selectIsAuthenticated } from "../redux/user";
import { GLOBAL_CONSTANTS } from "../constants";
import { AssetDetailFavorite, AssetDetailHeaderTitle } from "../screens/AssetDetail/components";
import SCREEN_NAMES from "./screen-names";

const Stack = createStackNavigator();

const RootNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: TYPOGRAPHY.title, headerTitleAlign: "center" }}>
      <Stack.Screen
        name={SCREEN_NAMES.BOTTOM_TABS_HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name={SCREEN_NAMES.CHANGE_PASSWORD}
            component={ChangePasswordScreen}
            options={{
              headerTitle: "Change Password"
            }}
          />
          <Stack.Screen
            name={SCREEN_NAMES.CHANGE_EMAIL_OR_NAME}
            component={ChangeEmailOrNameScreen}
            options={{
              headerTitle: "Change Email or Name"
            }}
          />
          <Stack.Screen
            name={SCREEN_NAMES.SELECT_TRANSACTION_COIN}
            component={SelectTransactionCoinScreen}
            options={{
              headerTitle: "Select a Coin"
            }}
          />
          <Stack.Screen name={SCREEN_NAMES.ADD_EDIT_TRANSACTION} component={AddEditTransactionScreen} />
          <Stack.Screen
            name={SCREEN_NAMES.HOLDING_OVERVIEW}
            component={HoldingOverviewScreen}
            options={{
              headerTitle: ""
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} options={{ headerTitle: "Login" }} />
          <Stack.Screen name={SCREEN_NAMES.SIGN_UP} component={SignUpScreen} options={{ headerTitle: "Sign Up" }} />
        </>
      )}
      <Stack.Screen
        name={SCREEN_NAMES.PRICE_ALERT}
        component={PriceAlertScreen}
        options={{ headerTitle: "Price Alerts" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.COMPARE_CURRENCY}
        component={CompareCurrencyScreen}
        options={{
          headerTitle: "Compare Currencies"
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CONVERT_CURRENCY}
        component={ConvertCurrencyScreen}
        options={{
          headerTitle: "Currency Converter"
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_CURRENCY}
        component={SelectCurrencyScreen}
        options={{ headerTitle: "Select Currency" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_HOME_SCREEN}
        component={SelectHomeScreen}
        options={{
          headerTitle: "Select Home Screen"
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.TERMS_AND_PRIVACY}
        component={TermsAndPrivacyScreen}
        options={{
          headerTitle: "Terms and Privacy"
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ASSET_DETAIL}
        component={AssetDetailScreen}
        options={({ route }) => ({
          headerTitle: () => <AssetDetailHeaderTitle {...route} />,
          headerRight: () => <AssetDetailFavorite {...route} />
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DISCOVER_EVENT_FILTERS}
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
        name={SCREEN_NAMES.ASSET_DETAIL_EVENT_FILTERS}
        component={AssetDetailEventFiltersScreen}
        options={({ navigation }) => ({
          headerTitle: "Select Filters",
          headerLeft: null,
          headerRight: () => (
            <CloseIconButton style={{ marginRight: GLOBAL_CONSTANTS.MD_MARGIN }} onPress={() => navigation.goBack()} />
          )
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.EVENT_DETAILS}
        component={EventDetailScreen}
        options={{ headerTitle: "Event Details" }}
      />
      <Stack.Screen name={SCREEN_NAMES.SEARCH_CRYPTO} component={SearchCryptoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(mapStateToProps)(RootNavigator);
