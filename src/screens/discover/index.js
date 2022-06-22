import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventsScreen from "../events";
import NewsScreen from "../news";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";
import { Text } from "react-native-paper";
import { BadgeTabBar } from "../../shared-components";

const NewsTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Ionicons name="newspaper-outline" size={size} color={color} />
);

const EventsTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Ionicons name="calendar-sharp" size={size} color={color} />
);

const Tab = createMaterialTopTabNavigator();

const DiscoverScreen = () => (
  <>
    <Text style={STYLES.heading}>Discover</Text>
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: true
      }}
      tabBar={(props) => <BadgeTabBar {...props} containerStyles={STYLES.tabBarContainer} />}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: "News",
          tabBarIcon: NewsTabIcon
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: "Events",
          tabBarIcon: EventsTabIcon
        }}
      />
    </Tab.Navigator>
  </>
);

const STYLES = StyleSheet.create({
  heading: {
    ...GLOBAL_STYLES.screenContainer,
    ...GLOBAL_STYLES.smMarginBottom,
    ...TYPOGRAPHY.display1,
    paddingBottom: 0
  },
  tabBarContainer: {
    paddingTop: 0
  }
});

export default DiscoverScreen;
