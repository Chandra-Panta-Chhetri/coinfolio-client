import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewsScreen from "../screens/NewsScreen";
import PortfolioScreen from "../screens/PortfolioScreen";

const BottomTab = createBottomTabNavigator();

const HomeTabIcon = ({ color, size }) => (
  <AntDesign name="home" size={size} color={color} />
);

const MarketTabIcon = ({ color, size }) => (
  <AntDesign name="barschart" size={size} color={color} />
);

const PortfolioTabIcon = ({ color, size }) => (
  <Feather name="pie-chart" size={size} color={color} />
);

const NewsTabIcon = ({ color, size }) => (
  <FontAwesome name="newspaper-o" size={size} color={color} />
);

const SettingsTabIcon = ({ color, size }) => (
  <AntDesign name="setting" size={size} color={color} />
);

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false
      }}
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
