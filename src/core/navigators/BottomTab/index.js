import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  MarketOverviewScreen,
  SettingsScreen,
  NewsScreen,
  PortfolioScreen
} from "../../../screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectHomeScreen } from "../../../redux/preferences";
import {
  HomeTabIcon,
  SettingsTabIcon,
  NewsTabIcon,
  MarketTabIcon,
  PortfolioTabIcon
} from "./TabIcons";

const BottomTab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

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
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: NewsTabIcon
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioScreen}
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
