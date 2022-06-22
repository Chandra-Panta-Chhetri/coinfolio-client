import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { BadgeTabBar } from "../../shared-components";
import AssetDetailOverviewScreen from "../asset-detail-overview";
import AssetDetailExchangesScreen from "../asset-detail-exchanges";
import AssetDetailAboutScreen from "../asset-detail-about";
import AssetDetailNewsScreen from "../asset-detail-news";
import AssetDetailEventsScreen from "../asset-detail-events";

const Tab = createMaterialTopTabNavigator();

const AssetDetailScreen = () => (
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
    />
    <Tab.Screen
      name="AssetDetailExchanges"
      component={AssetDetailExchangesScreen}
      options={{
        title: "Exchanges"
      }}
    />
    <Tab.Screen
      name="AssetDetailAbout"
      component={AssetDetailAboutScreen}
      options={{
        title: "About"
      }}
    />
    <Tab.Screen
      name="AssetDetailNews"
      component={AssetDetailNewsScreen}
      options={{
        title: "News"
      }}
    />
    <Tab.Screen
      name="AssetDetailEvents"
      component={AssetDetailEventsScreen}
      options={{
        title: "Events"
      }}
    />
  </Tab.Navigator>
);

const STYLES = StyleSheet.create({});

export default AssetDetailScreen;
