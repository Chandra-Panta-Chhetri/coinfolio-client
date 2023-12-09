import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, MarketOverviewScreen, SettingsScreen, DiscoverScreen } from "../screens";
import { useTheme, BottomNavigation } from "react-native-paper";
import { connect } from "react-redux";
import { selectInitialScreen } from "../redux/preferences";
import PortfolioNavigator from "./PortfolioNavigator";
import { DEVICE_TYPES } from "../constants";
import SCREEN_NAMES from "./screen-names";
import { DiscoverTabIcon, HomeTabIcon, MarketTabIcon, PortfolioTabIcon, SettingsTabIcon } from "./BottomTabIcons";

const BottomTab = createBottomTabNavigator();

const AndroidBottomTabBar = ({ navigation, state, descriptors, insets, theme, tabBarStyle }) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.navigate(route);
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color });
        }

        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.title;

        return label;
      }}
      activeColor={theme?.colors?.primary}
      style={tabBarStyle}
      shifting={false}
    />
  );
};

const BottomTabNavigator = ({ initialScreen }) => {
  const theme = useTheme();
  const tabBarStyle = { backgroundColor: theme?.colors?.card };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: theme?.colors?.primary
      }}
      initialRouteName={initialScreen?.value}
      backBehavior="none"
      tabBar={
        Platform.OS === DEVICE_TYPES.ANDROID
          ? (props) => <AndroidBottomTabBar {...props} theme={theme} tabBarStyle={tabBarStyle} />
          : undefined
      }
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
          tabBarLabel: "Market"
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
          tabBarLabel: "Setting"
        }}
      />
    </BottomTab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  initialScreen: selectInitialScreen(state)
});

export default connect(mapStateToProps)(BottomTabNavigator);
