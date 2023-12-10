import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, MarketOverviewScreen, SettingsScreen, DiscoverScreen } from "../screens";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectInitialScreen } from "../redux/preferences";
import PortfolioNavigator from "./PortfolioNavigator";
import { GLOBAL_CONSTANTS } from "../constants";
import SCREEN_NAMES from "./screen-names";
import { DiscoverTabIcon, HomeTabIcon, MarketTabIcon, PortfolioTabIcon, SettingsTabIcon } from "./BottomTabIcons";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ initialScreen }) => {
  const theme = useTheme();
  const tabBarStyle = { backgroundColor: theme?.colors?.card };
  const tabBarItemStyle = {
    marginTop: GLOBAL_CONSTANTS.SM_MARGIN
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: theme?.colors?.primary,
        tabBarItemStyle,
        freezeOnBlur: true
      }}
      initialRouteName={initialScreen?.value}
      backBehavior="none"
    >
      <BottomTab.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon,
          tabBarLabel: "Home"
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.MARKET_OVERVIEW}
        component={MarketOverviewScreen}
        options={{
          tabBarIcon: MarketTabIcon,
          tabBarLabel: "Markets"
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.DISCOVER}
        component={DiscoverScreen}
        options={{
          tabBarIcon: DiscoverTabIcon,
          tabBarLabel: "Discover"
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.PORTFOLIO_HOME}
        component={PortfolioNavigator}
        options={{
          tabBarIcon: PortfolioTabIcon,
          tabBarLabel: "Portfolio"
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsTabIcon,
          tabBarLabel: "Settings"
        }}
      />
    </BottomTab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  initialScreen: selectInitialScreen(state)
});

export default connect(mapStateToProps)(BottomTabNavigator);
