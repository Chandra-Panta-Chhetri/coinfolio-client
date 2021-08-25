import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewsScreen from "../screens/NewsScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import CONSTANTS from "../Constants";
import { connect } from "react-redux";
import { selectHomeScreen } from "../redux/preferences/preferences.selectors";

const BottomTab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const HomeTabIcon = ({ color }) => (
  <AntDesign
    name="home"
    size={CONSTANTS.SHARED.BOTTOM_TAB_ICON_SIZE}
    color={color}
  />
);

const MarketTabIcon = ({ color }) => (
  <AntDesign
    name="barschart"
    size={CONSTANTS.SHARED.BOTTOM_TAB_ICON_SIZE}
    color={color}
  />
);

const PortfolioTabIcon = ({ color }) => (
  <Feather
    name="pie-chart"
    size={CONSTANTS.SHARED.BOTTOM_TAB_ICON_SIZE}
    color={color}
  />
);

const NewsTabIcon = ({ color }) => (
  <FontAwesome
    name="newspaper-o"
    size={CONSTANTS.SHARED.BOTTOM_TAB_ICON_SIZE}
    color={color}
  />
);

const SettingsTabIcon = ({ color }) => (
  <AntDesign
    name="setting"
    size={CONSTANTS.SHARED.BOTTOM_TAB_ICON_SIZE}
    color={color}
  />
);

const BottomTabNavigation = ({ homeScreen }) => {
  const { colors } = useTheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false
      }}
      labeled={false}
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.card }}
      initialRouteName={homeScreen}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketScreen}
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

export default connect(mapStateToProps)(BottomTabNavigation);
