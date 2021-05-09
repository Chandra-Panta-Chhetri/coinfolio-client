import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar } from "react-native";
import SafeAreaAndroidStyles from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import WatchListScreen from "../screens/WatchlistScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import SettingsScreen from "../screens/SettingsScreen";

const BottomTab = createBottomTabNavigator();

const HomeTabIcon = ({ color, size }) => {
  return <AntDesign name="home" size={size} color={color} />;
};

const WatchlistTabIcon = ({ color, size }) => {
  return <AntDesign name="eyeo" size={size} color={color} />;
};

const PortfolioTabIcon = ({ color, size }) => {
  return <AntDesign name="linechart" size={size} color={color} />;
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
            }
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarIcon: HomeTabIcon, tabBarLabel: "Home" }}
          />
          <BottomTab.Screen
            name="Watchlist"
            component={WatchListScreen}
            options={{
              tabBarIcon: WatchlistTabIcon,
              tabBarLabel: "Watchlist"
            }}
          />
          <BottomTab.Screen
            name="Portfolio"
            component={PortfolioScreen}
            options={{
              tabBarIcon: PortfolioTabIcon,
              tabBarLabel: "Portfolio"
            }}
          />
          <BottomTab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: SettingsTabIcon,
              tabBarLabel: "Settings"
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default BottomTabNavigation;
