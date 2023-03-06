import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, MarketOverviewScreen, SettingsScreen, DiscoverScreen } from "../../../screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectHomeScreen } from "../../../redux/preferences";
import { HomeTabIcon, SettingsTabIcon, DiscoverTabIcon, MarketTabIcon, PortfolioTabIcon } from "./TabIcons";
import PortfolioNavigator from "../PortfolioNavigator";

const BottomTab = Platform.OS === "android" ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const BottomTabNavigator = ({ homeScreen }) => {
  const { colors } = useTheme();
  const tabBarStyle = { backgroundColor: colors.card };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarShowLabel: false
      }}
      labeled={false}
      activeColor={colors.primary}
      barStyle={tabBarStyle}
      initialRouteName={homeScreen.value}
      backBehavior="none"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon
        }}
      />
      <BottomTab.Screen
        name="MarketOverview"
        component={MarketOverviewScreen}
        options={{
          tabBarIcon: MarketTabIcon
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: DiscoverTabIcon
        }}
      />
      <BottomTab.Screen
        name="PortfolioHome"
        component={PortfolioNavigator}
        options={{
          tabBarIcon: PortfolioTabIcon
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsTabIcon
        }}
      />
    </BottomTab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  homeScreen: selectHomeScreen(state)
});

export default connect(mapStateToProps)(BottomTabNavigator);
