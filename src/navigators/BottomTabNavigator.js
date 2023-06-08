import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, MarketOverviewScreen, SettingsScreen, DiscoverScreen } from "../screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectInitialScreen } from "../redux/preferences";
import PortfolioNavigator from "./PortfolioNavigator";
import { DEVICE_TYPES } from "../constants";
import SCREEN_NAMES from "./screen-names";
import { DiscoverTabIcon, HomeTabIcon, MarketTabIcon, PortfolioTabIcon, SettingsTabIcon } from "./BottomTabIcons";

const BottomTab =
  Platform.OS === DEVICE_TYPES.ANDROID ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const BottomTabNavigator = ({ initialScreen }) => {
  const { colors } = useTheme();
  const tabBarStyle = { backgroundColor: colors?.card };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarShowLabel: false
      }}
      labeled={false}
      activeColor={colors?.primary}
      barStyle={tabBarStyle}
      initialRouteName={initialScreen?.value}
      backBehavior="none"
    >
      <BottomTab.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.MARKET_OVERVIEW}
        component={MarketOverviewScreen}
        options={{
          tabBarIcon: MarketTabIcon
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.DISCOVER}
        component={DiscoverScreen}
        options={{
          tabBarIcon: DiscoverTabIcon
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.PORTFOLIO_HOME}
        component={PortfolioNavigator}
        options={{
          tabBarIcon: PortfolioTabIcon
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsTabIcon
        }}
      />
    </BottomTab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  initialScreen: selectInitialScreen(state)
});

export default connect(mapStateToProps)(BottomTabNavigator);
