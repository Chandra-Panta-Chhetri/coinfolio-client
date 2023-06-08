import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BadgeTabBar } from "../../components";
import AssetDetailOverviewScreen from "../AssetDetailOverview";
import AssetDetailMarketsScreen from "../AssetDetailMarkets";
import AssetDetailAboutScreen from "../AssetDetailAbout";
import AssetDetailNewsScreen from "../AssetDetailNews";
import AssetDetailEventsScreen from "../AssetDetailEvents";
import SCREEN_NAMES from "../../navigators/screen-names";

const Tab = createMaterialTopTabNavigator();

const AssetDetailScreen = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: true
      }}
      tabBar={BadgeTabBar}
      backBehavior="none"
    >
      <Tab.Screen
        name={SCREEN_NAMES.ASSET_DETAIL_OVERVIEW}
        component={AssetDetailOverviewScreen}
        options={{
          title: "Overview"
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ASSET_DETAIL_MARKETS}
        component={AssetDetailMarketsScreen}
        options={{
          title: "Markets"
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ASSET_DETAIL_ABOUT}
        component={AssetDetailAboutScreen}
        options={{
          title: "About"
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ASSET_DETAIL_NEWS}
        component={AssetDetailNewsScreen}
        options={{
          title: "News"
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ASSET_DETAIL_EVENTS}
        component={AssetDetailEventsScreen}
        options={{
          title: "Events"
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default AssetDetailScreen;
