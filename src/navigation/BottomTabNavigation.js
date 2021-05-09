import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar } from "react-native";
import SafeAreaAndroidStyles from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewsScreen from "../screens/NewsScreen";

const BottomTab = createBottomTabNavigator();

const HomeTabIcon = ({ color, size }) => {
  return <AntDesign name="home" size={size} color={color} />;
};

const MarketTabIcon = ({ color, size }) => {
  return <AntDesign name="barschart" size={size} color={color} />;
};

const PortfolioTabIcon = ({ color, size }) => {
  return <Feather name="pie-chart" size={size} color={color} />;
};

const NewsTabIcon = ({ color, size }) => {
  return <FontAwesome name="newspaper-o" size={size} color={color} />;
};

const SettingsTabIcon = ({ color, size }) => {
  return <AntDesign name="setting" size={size} color={color} />;
};

const BottomTabNavigation = () => {
  return (
    <SafeAreaView style={SafeAreaAndroidStyles.AndroidSafeArea}>
      <StatusBar />
      <NavigationContainer>
        <BottomTab.Navigator
          tabBarOptions={{
            activeTintColor: "white",
            style: {
              backgroundColor: "black"
            },
            showLabel: false
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarIcon: HomeTabIcon }}
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
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default BottomTabNavigation;
