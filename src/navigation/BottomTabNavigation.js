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

const BottomTab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const HomeTabIcon = ({ color, size = 21.5 }) => (
  <AntDesign name="home" size={size} color={color} />
);

const MarketTabIcon = ({ color, size = 21.5 }) => (
  <AntDesign name="barschart" size={size} color={color} />
);

const PortfolioTabIcon = ({ color, size = 21.5 }) => (
  <Feather name="pie-chart" size={size} color={color} />
);

const NewsTabIcon = ({ color, size = 21.5 }) => (
  <FontAwesome name="newspaper-o" size={size} color={color} />
);

const SettingsTabIcon = ({ color, size = 21.5 }) => (
  <AntDesign name="setting" size={size} color={color} />
);

const BottomTabNavigation = () => {
  const { colors } = useTheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false
      }}
      labeled={false}
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.card }}
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

export default BottomTabNavigation;
