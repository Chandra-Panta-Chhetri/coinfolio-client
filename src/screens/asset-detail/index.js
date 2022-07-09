import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { BadgeTabBar } from "../../shared-components";
import AssetDetailOverviewScreen from "../asset-detail-overview";
import AssetDetailMarketsScreen from "../asset-detail-markets";
import AssetDetailAboutScreen from "../asset-detail-about";
import AssetDetailNewsScreen from "../asset-detail-news";
import AssetDetailEventsScreen from "../asset-detail-events";

const Tab = createMaterialTopTabNavigator();

const AssetDetailScreen = ({ route }) => (
  <Tab.Navigator
    screenOptions={{
      swipeEnabled: false,
      lazy: true,
      tabBarScrollEnabled: true
    }}
    tabBar={BadgeTabBar}
  >
    <Tab.Screen
      name="AssetDetailOverview"
      component={AssetDetailOverviewScreen}
      options={{
        title: "Overview"
      }}
      initialParams={route.params}
    />
    <Tab.Screen
      name="AssetDetailMarkets"
      component={AssetDetailMarketsScreen}
      options={{
        title: "Markets"
      }}
      initialParams={route.params}
    />
    <Tab.Screen
      name="AssetDetailAbout"
      component={AssetDetailAboutScreen}
      options={{
        title: "About"
      }}
      initialParams={route.params}
    />
    <Tab.Screen
      name="AssetDetailNews"
      component={AssetDetailNewsScreen}
      options={{
        title: "News"
      }}
      initialParams={route.params}
    />
    <Tab.Screen
      name="AssetDetailEvents"
      component={AssetDetailEventsScreen}
      options={{
        title: "Events"
      }}
      initialParams={route.params}
    />
  </Tab.Navigator>
);

const STYLES = StyleSheet.create({
  tabBar: {}
});

export default AssetDetailScreen;
